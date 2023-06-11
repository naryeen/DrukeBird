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
            return res.status(400).json({ message: "User Not Exists!!" });
        }

        const link = `https://druk-ebirds.onrender.com/api/v1/resetPassword/${oldUser._id}`;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "drukebird@gmail.com",
                pass: "vtzyoayzektgoyia"
            },
        });
  
        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email, 
            subject: "Password Reset",
            text: link,
            html:`<p> Hi Please copy the token </p><br>`
            

        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({ message: "You should receive an email" });
        
    } catch (err) { 
        return res.status(500).json({ err });
    }
};

exports.setPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        
        const oldUser = await User.findOne({ _id: id });

        if (!oldUser) {
            return res.status(400).json({ message: "User Not Exists" });
        }

        if (password.length < 8) {
            return res.status(500).json({ message: "Enter a password with more than 8 characters." });
        } else if (!/[a-z]/.test(password)) {
            return res.status(500).json({ message: "Enter at least one lowercase letter." });
        } else if (!/[A-Z]/.test(password)) {
            return res.status(500).json({ message: "Enter at least one uppercase letter." });
        } else if (!/\d/.test(password)) {
            return res.status(500).json({ message: "Enter at least one digit." });
        }

        const newPassword = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(
            id,
            {
                password: newPassword
            },
            { new: true }
        );
        
        return res.status(200).json({ message: "Password reset successful" });
    } 
    catch (err) {
        return res.json({ message: err });
    }
};

