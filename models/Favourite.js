const { Int32 } = require('mongodb');
const mongo = require('mongoose');
const FavouritesSchema = mongo.Schema({
    mediaImageURL: { 
        type: String,
    },

    videoTitle: {
        type: String,
    },

    id: {
        type: Int32,
    }

})

module.exports = mongo.model('Favourites', FavouritesSchema)