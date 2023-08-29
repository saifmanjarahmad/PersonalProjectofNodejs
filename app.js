const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// ...

// Serve static files from the "public" folder
app.use(express.static(__dirname + '/public'));

// ...


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.get('/registration', (req, res) => {
    res.render('register');
  });
  
  const emailValidator = require('email-validator'); // Install with npm install email-validator
  const passwordValidator = require('password-validator');
  const moment = require('moment'); // Install with npm install moment




  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!emailValidator.validate(email)) {
      res.send('Invalid email format');
      return;
    }
    // Implement login logic here
    // Check if email and password are valid
    // Set session variables
    res.redirect('/dashboard');
  });
  
  app.post('/register', (req, res) => {
    const { email, password, firstName, lastName, dob, phoneNumber } = req.body;
  
    // Password complexity validation
    const schema = new passwordValidator();
    schema
      .is().min(8)                                 // Minimum length 8
      .has().uppercase()                            // Must have at least one uppercase letter
      .has().lowercase()                            // Must have at least one lowercase letter
      .has().digits(1)                              // Must have at least one digit
      .has().symbols(1)                             // Must have at least one special character
      .has().not().spaces();                        // Should not have spaces
  
    if (!emailValidator.validate(email)) {
      res.send('Invalid email format');
      return;
    }
  
    if (!schema.validate(password)) {
      res.send('Password does not meet complexity requirements');
      return;
    }
  
    // Implement registration logic here
    // Create user account
    res.redirect('/login');
  });
  
  