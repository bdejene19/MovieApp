const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// import mongo and connect

var currentUser = User();
const mongo = require('mongoose');
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));

router.use(express.urlencoded({extended: false}))

// login post
router.post('/', (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    var userData = new User({
        userName: userName,
        password: password
    })

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

router.post('/login', (req, res) => {
    var username = req.body.userName;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    const newUser = new User({
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
    })



    

    /**const userData = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log(userData)
    const newUser = new User(userData);
    console.log('userData: ' + userData.password);

    if (User.find({userName: userData.userName})) {
        if (userData.password !== User.find({password: userData.password})) {
            res.send('"Username and/or password is incorrect"')
        } else {
            res.render('movies')
        }
    } else {*/
        newUser.save(err => {
            if (err) {
                console.log("problem")
            } else {
                console.log('data : has been saved to server');
            };
        });
        res.render('browse');
    
    
})

router.get('/', (req, res) => {
    res.render('account', {
        firstName: `${currentUser.firstName}`,
        lastName: `${currentUser.lastName}`,
    })
})

router.put('/browse', (req, res) => {
    console.log('this is my put update: ', req.body);   
})



module.exports = router;    