const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/User');

// import mongo and connect

const mongo = require('mongoose');
const { create } = require('express-handlebars');
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));

router.use(express.urlencoded({extended: false}))


// initialize global variables:
var currentUser = User();
var favouritedMovie = '';
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

    var signUpDate = new Date()
    signUpDate = signUpDate.getDate() + '/'  + signUpDate.getMonth() + '/'  +  signUpDate.getFullYear();
    User.findOne({userName: userName}, (err, userNameTaken) => {
        if (err) {
            console.log('there was an error');
        }


        if (userNameTaken !== null && userNameTaken) {
            res.status(200).render('createUser', {
                alreadyExists: 'true',
            })
            
        }

        if (!userNameTaken) {
            if (pswd === pswdRepeat) {
                    var createdUser = new User({
                        userName: userName,
                        firstName: firstName,
                        lastName: lastName,
                        password: pswd,
                        memberSince: signUpDate,
                    })

                    createdUser.save(err => {
                        if (err) {
                            console.log(err);
                        } else {
                            currentUser = createdUser;
                            res.redirect(`/browse`);   
                        }
                    })  
            }

        }
    })
    return currentUser;
})
// login post
router.post('/browse', (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;

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
                name: currentUser.firstName,
            });
        }

        else {
            res.send('incorrect password/username')
        };
    })
    return currentUser;
})

router.get('/accounts', (req, res) => {
    res.render('account', {
        firstName: `${currentUser.firstName}`,
        lastName: `${currentUser.lastName}`,
        userName: `${currentUser.userName}`,
        memberSinceDate: `${currentUser.memberSince}`,
    }) 

    return currentUser;
})
router.get('/browse', (req, res) => {
    res.render('browse', {
        name: `${currentUser.firstName}`,
    });
})

router.get('/movies', (req, res) => { 
    res.render('movies');
})

router.get('/tvShows', (req, res) => {
    res.render('shows', { 
        name: `${currentUser.firstName}`
    })
})

router.get('/favourites', (req, res) => {
    res.status(200).render('favourites', {
        favourites: favouritedMovie,
    });
})

router.post('/favourites', (req, res) => {
    favouritedMovie = req.body;
    

    console.log('favourited movie: ', favouritedMovie);
})

router.get('/index', (req, res) => {
    res.redirect('http://localhost:5000/');
})

module.exports = router;    