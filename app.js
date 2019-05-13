const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database.js');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

//Handlebars middleware
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => {
    res.render('index', {layout: 'landing'});
})

app.use('/jetskis', require('./routes/jetskis'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server is running on ' + PORT))