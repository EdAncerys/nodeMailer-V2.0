'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); // importing body parser middleware to parse form content from HTML
const nodemailer = require('nodemailer'); //importing node mailer

const dotenv = require('dotenv'); // Load Environment Variables from a .env File
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serving our contact form on '/' route
// route which captures form details and sends it to your personal mail

async function contactForm() {
  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_NAME, //replace with your email
      pass: process.env.EMAIL_PASSWORD, //replace with your password
    },
  });

  // Message object
  const message = {
    // Comma separated list of recipients
    to: process.env.MAILING_LIST,

    // Subject of the message
    subject: `Contact name: ${req.body.name}`,

    // plaintext body
    text: 'Hello plaintext body!',

    // HTML body
    html: `<h1>Contact details</h1>
    <h2> name:${req.body.name} </h2><br>
    <h2> email:${req.body.email} </h2><br>
    <h2> phonenumber:${req.body.phoneNumber} </h2><br>
    <h2> message:${req.body.message} </h2><br>`,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  console.log(nodemailer.getTestMessageUrl(info));

  // only needed when using pooled connections
  transporter.close();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

const port = 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
