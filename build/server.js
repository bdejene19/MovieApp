// bring in express/exphbs
const express = require('express');
const exphbs = require('express-handlebars');
const mongo = require('mongoose')
const path = require('path');
const cors = require('cors');


// initalize express/handlebars
const app = express();
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// adding body parser to server, also adding url encoded data handler
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.get('/', (req, res) => { 
    res.render('index', {
        title: "Welcome to Movie Pop!"
    })
});

// 
app.use('/', require('./router'));



app.use(express.static(path.join(__dirname, 'public')));

// connecting to server
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
