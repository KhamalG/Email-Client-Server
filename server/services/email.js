const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.APIKEY)

const sendEmail = (to, from, subject, text) => {
    const msg = {
        to, 
        from, 
        subject,
        text,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}

module.exports = {sendEmail};