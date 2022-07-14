const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserShema = new Schema({
    name : String,
    age : Number,
    address : String,
    tel : Number,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',UserShema)