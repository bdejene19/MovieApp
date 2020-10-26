const express = require('express');
const router = express.Router();
const User = require('./models/User');

// import mongo and connect

var currentUser = User();
const mongo = require('mongoose');
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));

router.use(express.urlencoded({extended: false}))


// create user
router.get('/createUser', (req, res) => {
    
    res.render('createUser');
})

router.post('/createUser', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var pswd = req.body.pswd;
    var pswdRepeat = req.body.pswdRepeat;

    User.findOne({userName: userName}, (err, userNameTaken) => {
        if (err) {
            console.log('there was an error');
        }


        if (userNameTaken !== null) {
            console.log('sorry, username is already taken');
        }

        if (!userNameTaken) {
            console.log('userName is valid');
            if (pswd === pswdRepeat) {
                var createdUser = new User({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    password: pswd,
                });

                console.log('this is my new user object: ', createdUser);

                createdUser.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).render('browse', {
                            name: createdUser.firstName,
                        })         
                    }
                })
            }
        }
    })
})
// login post
router.post('/browse', (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;

    console.log(req.body);
    var userData = new User({
        userName: userName,
        password: password
    })

    var userName = req.body.userName;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    currentUser = userData;

    User.findOne({userName: userName, password: password}, (err, user) => {
        if (err) {
            console.log("error has occured");
        } 

        if (!user) {
            res.status(404).send('error occured')
        }

        if (user) {
            currentUser = user;
            res.status(200).render('browse', {
                name: userName,
            });
        }

        else {
            res.send('incorrect password/username')
        };
    })


})

router.get('/accounts', (req, res) => {
    res.status(200).render('account', {
        firstName: `${currentUser.firstName}`,
        lastName: `${currentUser.lastName}`,
        userName: `${currentUser.userName}`
    })
})
router.get('/browse', (req, res) => {
    res.render('browse');
})

router.get('/movies', (req, res) => { 
    res.render('movies');
})

router.get('/tvShows', (req, res) => {
    res.render('shows')
})

router.get('/genres', (req, res) => {
    res.render('genres')
})

router.get('/favourites', (req, res) => {
    res.status(200).render('favourites');
})


router.put('/browse', (req, res) => {
    console.log('this is my put update: ', req.body);   
})




router.post('/favourites', (req, res) => {
    console.log('my req body: ', req.body);;
})


module.exports = router;    