// const dotenv = require("dotenv")
// dotenv.config()
const mongoose = require ('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!' ],
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },

    DoB: {
        type: String,
        required:[true, 'Enter Your date of birth'],
        select:false
    },
   
    country: {
        type: String,
        required: [true, 'Please provide a country!'],
        select: false,   
    },

    profession: {
        type: String,
        required: [true, 'Please provide a profession!'],
        select: false,   
    },

    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        select: false,   
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!',
        },
      },

    active: {
        type: Boolean,
        default: true,
        select: false,
    },

})
// mongooose middleware


userSchema.pre('save',async function (next){
// Only run this function if password was actually modified
    if (!this.isModified('password'))return next()

    //Hash the password with cost of 12
    //this.password = await bcrypt.hash(this.password,process.env.PASSWORD_HASH_KEY)
    this.password = await bcrypt.hash(this.password,12)

    //Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

userSchema.path('DoB').validate(function (DoB){
    var dobRegex = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/g;
    return dobRegex.test(DoB);
}, 'Enter DoB in MM/DD/YYYY')

userSchema.path('password').validate(function (password){
    var passwordRegex = /[0-9a-zA-Z]{8,}/g;
    return passwordRegex.test(password);
}, 'Enter passsword more than 8')


//Instance method is available in all document of certain collection while login
userSchema.methods.correctPassword = async function(
    candidatePassword,//Password that user pass
    userPassword,//password that store in the database
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema )
module.exports = User


