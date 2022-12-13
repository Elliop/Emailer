export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
         auth: {
              user: 'abdelmouhayminegx@gmail.com',
              pass: process.env.PASSWORD,
           },
      secure: true,
    });
    
    const mailData = {
        from: 'abdelmouhayminegx@gmail.com',
        to: req.body.email,
        subject: `Emailer Test`,
        text: `Email sent successfully to ${req.body.email}`,
    }
  
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          res.send(err.message)
        else
          res.send(info)
    })
  }