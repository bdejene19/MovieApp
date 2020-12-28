const express = require('express');
const router = express.Router();
const Favourite = require('../../models/Favourite');


const mongo = require('mongoose');
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, console.log('connected to db'));
router.use(express.urlencoded({extended: false}));

router.post('/', (req, res) => {
    console.log(req.body);
})


module.exports = router;

