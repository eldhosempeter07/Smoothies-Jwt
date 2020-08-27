const mongoose = require('mongoose');
const {isEmail} =require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter the email'],
        unique:true,
        validate:[isEmail,'Please enter valid email'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Please enter the password'],
        minlength:[6,'Please enter min of 6 characters']
    }
}
);


// fire schema before doc saved to db
userSchema.pre('save',async function(next){
    const salt =await bcrypt.genSalt();
    this.password =await bcrypt.hash(this.password,salt)
    next();
})

// Static method

userSchema.statics.login =async function (email,password) {
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};

module.exports = new mongoose.model('users',userSchema);