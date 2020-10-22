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

    firstName: String,
    lastName: String,
})

module.exports = mongo.model("User", UserSchema);