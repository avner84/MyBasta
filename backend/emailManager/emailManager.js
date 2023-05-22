const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
nodemailerTransporterPass =  process.env.NODEMAILER_TRANSPORTER_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mybasta100@gmail.com',
    pass: nodemailerTransporterPass,

  },
  tls: {
    rejectUnauthorized: false,
  },
});


function accountVerificationEmail(destinationAddress, token) {
  let mailOptions = {
    from: '"מיי-בסטה 🛍" <mybasta100@gmail.com>',
    to: destinationAddress,
    subject: 'אנא אשר את החשבון שלך באתר "מיי-בסטה"',
    html: ` <div style="font-family: Arial, Helvetica, sans-serif">
        <h3>ברוך הבא לאתר מיי-בסטה</h3>
        <p>על מנת להשלים את הרישום יש לאמת את חשבונך על ידי לחיצה על <a href="http://localhost:3500/api/auth/confirmAccount?token=${token}">הקישור הזה</a>.
        </p> 
        <p>שים לב! חשבון שלא יאושר בתוך 30 דקות ימחק.</p>      
        <p> בברכה, מיי-בסטה מרקט</p>
    </div>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { accountVerificationEmail }