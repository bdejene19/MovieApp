const mongo = require('mongoose');
const UserSchema = mongo.Schema({
    userName: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    favourites: [{
        type: String, 
        required: false,
    }]

})

module.exports = mongo.model("User", UserSchema);