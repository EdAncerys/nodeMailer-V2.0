var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); // importing body parser middleware to parse form content from HTML
var nodemailer = require('nodemailer'); //importing node mailer

const mailList = 'email@gmail.com, email@gmail.com';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); // serving our contact form on all routes

// route which captures form details and sends it to your personal mail
app.post('/sendemail', (req, res, next) => {
  console.log(req.body);
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'email@gmail.com', //replace with your email
      pass: 'password', //replace with your password
    },
  });

  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: 'automated.nodemailer@gmail.com', //replace with your email
    to: mailList, //replace with your email
    subject: `Contact name: ${req.body.name}`,
    html: `<h1>Contact details</h1>
          <h2> name:${req.body.name} </h2><br>
          <h2> email:${req.body.email} </h2><br>
          <h2> phonenumber:${req.body.phonenumber} </h2><br>
          <h2> message:${req.body.message} </h2><br>`,
  };

  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send('error'); // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully'); //if mail is sent successfully send Sent successfully as response
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
