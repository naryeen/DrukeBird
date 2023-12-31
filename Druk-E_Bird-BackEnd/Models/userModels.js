const dotenv = require("dotenv")
dotenv.config()
const mongoose = require ('mongoose')
const bcrypt = require("bcryptjs")
const moment = require('moment');

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
    },

    photo: {
        type: String,
        default: `https://res.cloudinary.com/drukebird/image/upload/v1686213437/DrukeBird/UserProfile/ogx0bvfrd0n0usqvudzm.jpg`
        
    },

    dob: {
        type: String,
        required: [true, 'Enter your date of birth'],
        default: moment().format('YYYY-MM-DD')
    },
   
    country: {
        type: String,
        required: [true, 'Please provide a country!'],  
    },

    profession: {
        type: String,
        required: [true, 'Please provide a profession!'],
    },
    photo: {
        type: String,
        default: `https://res.cloudinary.com/cheki/image/upload/v1685611183/DrukEBird/UserProfile/t81wqdwevcbkhu1wdl7u.jpg`
        
    },

    password: {
        type: String,
        required: [true, 'Please provide a password!'],   
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



userSchema.path('password').validate(function (password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    if (password.length < 8) {
        throw new Error("Enter a password more than 8 characters.");
    } else if (!/[a-z]/.test(password)) {
        throw new Error("Enter at least one lowercase letter.");
    }else if (!/[A-Z]/.test(password)) {
        throw new Error("Enter at least one uppercase letter.");
    }

    return passwordRegex.test(password);
},);

//Instance method is available in all document of certain collection while login
userSchema.methods.correctPassword = async function(
    candidatePassword,//Password that user pass
    userPassword,//password that store in the database
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
    update.password !== undefined &&
    update.password == update.passwordConfirm) {
        this.getUpdate().password = await bcrypt.hash(update.password, 12)
        update.passwordConfirm = undefined
        next()
    } else
    next()
})


const User = mongoose.model('User', userSchema )
module.exports = User


