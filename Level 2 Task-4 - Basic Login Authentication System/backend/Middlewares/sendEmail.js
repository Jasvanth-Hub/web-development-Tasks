
const nodemailer = require("nodemailer")

exports.sendEmail = async (options) =>{
    
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ea0c27e628ba15",
          pass: "e8a2e409fc5788"
        }
      })

    const mailOptions ={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transport.sendMail(mailOptions)

}