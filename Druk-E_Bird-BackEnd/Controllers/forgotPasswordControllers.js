const User = require('../Models/userModels')
const AppError = require('../utils/appError.js')
const nodemailer = require('nodemailer')
const bcrypt = require("bcryptjs")
const validator = require('validator')

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(400).json({message : "User Not Exists!!"})
        }

        const link = `https://druk-ebirds.onrender.com/api/v1/resetPassword/${oldUser._id}`;

        //const link = `http://localhost:4001/api/v1/resetPassword/${oldUser._id}`;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:"12190099.gcit@rub.edu.bt",
                pass: "qlszefmvnjjdymju"
            },
        });
  
        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email, 
            subject: "Password Reset",
            text: link,
        };

        await transporter.sendMail(mailOptions)

        return res.status(201).json({message : "you should receive an email"})
        
    } catch (err) { 
        return res.status(500).json({ err }) 
    }

};

exports.setPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        
        const oldUser = await User.findOne({ _id: id });

        if (!oldUser) {
            // return next(new AppError('User Not Exists!!', 400))
            return res.status(400).json({message:"User Not Exists"})
        }
        var passwordRegex = /[0-9a-zA-Z]{8,}/g;
        if(!passwordRegex.test(password)){
            console.log("password is",passwordRegex.test(password))
            return res.status(500).json({message: "Enter passsword more than 8"});
        }
       
        const newPassword = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(
            id,
            {
                password : newPassword
            },
            { new: true }
        )
        return res.status(200).json({message: "password reset successful"});
    } 
    catch (err) {

        res.json({message: err });
    }
}