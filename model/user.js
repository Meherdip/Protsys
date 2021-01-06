const mongoose= require('mongoose');
const  bcrypt = require('bcryptjs');

const userModel= new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String

    }

})
userModel.methods.comparePassword = function(password){
    return  bcrypt.compareSync(password, this.password);
    }   
    
module.exports = mongoose.model('userModel',userModel)