const { sendEmail } = require("../Middlewares/sendEmail")
const User = require("../models/User")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.register = async (req, res) => {
    try {

        const { name, email, password, avatar } = req.body
        let user = await User.findOne({ email })

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars"
        })

        user = await User.create({
            name, email, password, avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })

        const options = { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true }
        const token = await user.generateToken()

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            message: "loggined successfully.."
        })


    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            })
        }

        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const options = { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true }

        const token = await user.generateToken()

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            message: "loggined successfully.."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.logOut = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        const options = { expires: new Date(Date.now()), httpOnly: true }

        res.status(200).cookie("token", null, options).json({
            success: true,
            user,
            message: "Logged Out.."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message

        })
    }
}

exports.updatePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password")

        console.log(user)

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(401).json({
                success: false,
                message: "Please provide old and new password"
            })
        }

        const isMatch = await user.matchPassword(oldPassword)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password"
            })
        }

        user.password = newPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password Updated.."
        })


    } catch (err) {
        res.status(501).json({
            success: false,
            message: err.message
        })
    }
}


exports.updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        const { name, email, avatar } = req.body

        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars"
            })

            user.avatar.public_id = myCloud.public_id
            user.avatar.url = myCloud.secure_url

        }

        await user.save()

        res.status(200).json({
            success: true,
            message: "Profile Updated successfully .."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

        await User.deleteOne({ _id: req.user._id })

        const options = { expires: new Date(Date.now()), httpOnly: true }


        res.cookie("token", null, options)

        await user.save()

        res.status(200).json({
            success: true,
            user,
            message: "Account deleted successfully.."
        })


    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.myProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please Login ."
            })
        }

        res.status(200).json({
            success: true,
            user,
            message: "User loaded successfully .."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {

        var { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found .."
            })
        }

        const resetPasswordToken = user.getResetPasswordToken()

        await user.save()


        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/resetpassword/${resetPasswordToken}`

        const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`

        try {

            await sendEmail({ email: user.email, subject: "Reset Password", message })

            res.status(200).json({
                success: true,
                message: `Email sent successfully to .. ${user.email}`
            })

        } catch (err) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}




exports.resetPassword = async (req, res) => {
    try {

        const { newPassword } = req.body


        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } }).select("+password")


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Token expired or Invalid token .."
            })
        }

        user.password = newPassword

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(201).json({
            success: true,
            user: user.name,
            message: "Your password has been reset successfully, proceed your login .."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}