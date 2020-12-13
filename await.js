'use strict';
console.log('await.js loaded...');

const nodemailer = require('nodemailer'); //importing node mailer

const dotenv = require('dotenv'); // Load Environment Variables from a .env File
dotenv.config();

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
    // Replace with your email
    from: process.env.EMAIL_NAME,
    // Comma separated list of recipients
    to: process.env.MAILING_LIST,

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔',

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html:
      '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
      '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

    // An array of attachments
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

formSubmit().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
