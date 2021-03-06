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

app.post('/sendEmail', (req, res, next) => {
  console.log(req.body);
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
here we are using gmail as our service
In Auth object , we specify our email and password
*/
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_NAME, //replace with your email
      pass: process.env.EMAIL_PASSWORD, //replace with your password
    },
  });
  /*
In mailOptions we specify from and to address, subject and HTML content.
In our case , we use our personal email as from and to address,
Subject is Contact name and
html is our form details which we parsed using bodyParser.
*/
  const mailOptions = {
    from: process.env.EMAIL_NAME, //replace with your email
    to: process.env.MAILING_LIST, //replace with your email
    subject: `Contact name: ${req.body.name}`,
    html: `<h1>Contact details</h1>
<h2> name:${req.body.name} </h2><br>
<h2> email:${req.body.email} </h2><br>
<h2> phonenumber:${req.body.phoneNumber} </h2><br>
<h2> message:${req.body.message} </h2><br>`,
  };
  /*
 Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
call back as parameter
*/

  transporter.sendMail(mailOptions, (error, info) => {
    // e.preventDefault();
    if (error) {
      console.log(error);
      res.send('error'); // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
      // res.render('Sent Successfully ' + info.response); //if mail is sent successfully send Sent successfully as response
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
