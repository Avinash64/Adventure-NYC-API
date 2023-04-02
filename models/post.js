const mongoose = require('mongoose')

const postTemplate = new mongoose.Schema({
    placeid: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    postedById: {
        type: String,
        default:null
    },
    bio: {
        type: String,
        default: null
    },
    background: {
        type: String,
        default: null 
    },
    photo: {
        type: String,
        default: null
    },
    signature: {
        type: String,
        default: null
    },
    datePosted: {
        type: String,
        default: Date.now()
    }


})

module.exports = mongoose.model('Post', postTemplate)