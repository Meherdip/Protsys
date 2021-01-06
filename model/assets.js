const mongoose= require('mongoose');
var moment = require('moment'); // require
const assetsSchema= new mongoose.Schema({
    name:{
        type:String

    },
    registration_date:{
        type:Date
    },
    status:{
        type:Boolean || true
    }

})

module.exports = mongoose.model('assetsModal',assetsSchema)