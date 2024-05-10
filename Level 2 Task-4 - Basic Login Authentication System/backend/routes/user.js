const express = require("express")
const {
    register,
    login, 
    logOut,
    updatePassword,
    updateProfile,
    deleteAccount,
    myProfile,
    forgotPassword,
    resetPassword
} = require("../controllers/user")
const { isAuthenticated } = require("../Middlewares/auth")

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticated, logOut)
router.route("/updatepassword").put(isAuthenticated, updatePassword)
router.route("/updateprofile").put(isAuthenticated, updateProfile)
router.route("/deleteaccount").delete(isAuthenticated, deleteAccount)
router.route("/myprofile").get(isAuthenticated,myProfile)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:token").put( resetPassword)


module.exports = router