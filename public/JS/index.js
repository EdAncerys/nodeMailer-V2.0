const nodemailer = require('nodemailer'); //importing node mailer
const dotenv = require('dotenv'); // Load Environment Variables from a .env File
dotenv.config();

console.log('index.js loaded...');

async function formSubmit() {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_NAME, //replace with your email
      pass: process.env.EMAIL_PASSWORD, //replace with your password
    },
  });

  // Message object
  const message = {
    from: process.env.EMAIL_NAME,
    to: process.env.MAILING_LIST,
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Hello to myself!',
    attachments: [
      // String attachment
      {
        filename: 'notes.txt',
        content: 'Some notes about this e-mail',
        contentType: 'text/plain', // optional, would be detected from the filename
      },
    ],
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent successfully!');

  // only needed when using pooled connections
  transporter.close();
}

document.getElementById('await-submit').addEventListener('click', (event) => {
  // event.preventDefault();
  console.log('Submit @ index.html');
  formSubmit();
});
