// bring in express/exphbs
const express = require('express');
const exphbs = require('express-handlebars');
const mongo = require('mongoose')
require('dotenv/config');
const path = require('path');


// initalize express/handlebars
const app = express();
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// adding body parser to server, also adding url encoded data handler
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => { 
    res.render('index', {
        title: "Welcome to Movie Pop!"
    })
});
// this connects our post request to '/browse' to express app
app.use('/browse', require('./routes/api/users'));
app.use('/accounts', require('./routes/api/users'));
app.use('/movies', require('./routes/api/users'));
app.use('/tvShows', require('./routes/api/users'));
app.use('/genres', require('./routes/api/users'));


app.use(express.static(path.join(__dirname, 'public')));

// connecting to server
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
