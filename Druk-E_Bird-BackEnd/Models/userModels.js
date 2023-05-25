// const dotenv = require("dotenv")
// dotenv.config()
const mongoose = require ('mongoose')
const bcrypt = require("bcryptjs")

// const VerifyingOTPdata = new mongoose.Schema({
//     email: {
//       type: String,
//       required: [true, 'email'],
//     //   required: [true, 'Please provide your email'],
//     //   validate: [validator.isEmail, 'Please provide a valid email'],
//       unique: true,
//       lowercase: true,
//     },
//     name: {
//       type: String,
//     //   required: [true, 'Please tell us your name!' ],
//     required: [true, 'name'],
//     },
//   });

// const userSchema = new mongoose.Schema({
//     // name: {
//     //     type: String,
//     //     required: [true, 'Please tell us your name!' ],
//     // },

//     // email: {
//     //     type: String,
//     //     required: [true, 'Please provide your email'],
//     //     unique: true,
//     //     lowercase: true,
//     // },

//     VerifyingOTPdata:VerifyingOTPdata,

//     photo: {
//         type: String,
//         default: `http://res.cloudinary.com/cheki/image/upload/v1684309596/ietnmi5axvciw3dnornw.jpg`
        
//     },

//     dob: {
//         type: String,
//         required:[true, 'Enter Your date of birth'],
//     },
   
//     country: {
//         type: String,
//         required: [true, 'Please provide a country!'],  
//     },

//     profession: {
//         type: String,
//         required: [true, 'Please provide a profession!'],
//     },
//     photo: {
//         type: String,
//         default: `http://res.cloudinary.com/cheki/image/upload/v1684309596/ietnmi5axvciw3dnornw.jpg`
        
//     },

//     password: {
//         type: String,
//         required: [true, 'Please provide a password!'],
//         // select: false,   
//     },

//     passwordConfirm: {
//         type: String,
//         required: [true, 'Please confirm your password'],
//         validate: {
//           validator: function (el) {
//             return el === this.password;
//           },
//           message: 'Passwords are not the same!',
//         },
//       },

//     active: {
//         type: Boolean,
//         default: true,
//         // select: false,
//     },

// })

const userSchema = new mongoose.Schema({
    VerifyingOTPdata: {
      type: {
        Verifyingdata: {
          type: {
            email: {
              type: String,
              required: [true, 'email'],
              unique: true,
              lowercase: true,
            },
            name: {
              type: String,
              required: [true, 'name'],
            },
          },
          required: true,
        },
      },
      required: true,
    },
    country: {
      type: String,
      required: [true, 'Please provide a country!'],
    },
    dob: {
      type: String,
      required: [true, 'Enter Your date of birth'],
    },
    profession: {
      type: String,
      required: [true, 'Please provide a profession!'],
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
    photo: {
      type: String,
      default: 'http://res.cloudinary.com/cheki/image/upload/v1684309596/ietnmi5axvciw3dnornw.jpg',
    },
    active: {
      type: Boolean,
      default: true,
    },
  });
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

userSchema.path('dob').validate(function (dob){
    var dobRegex = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/g;
    return dobRegex.test(dob);
}, 'Enter DoB in MM/DD/YYYY')

userSchema.path('password').validate(function (password){
    ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/=password, that i want to include later
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

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
    update.password !== undefined &&
    update.password == update.passwordConfirm) {
        this.getUpdate().password = await bcrypt.hash(update.password, 12)

        //Delete passwordConfirm Field
        update.passwordConfirm = undefined
        next()
    } else
    next()
})


const User = mongoose.model('User', userSchema )
module.exports = User


