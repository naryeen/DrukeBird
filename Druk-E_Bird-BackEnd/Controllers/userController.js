const User = require('../Models/userModels')
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

var OTP = "123456"
export var name;
export var email;

const sendResetPasswordMail = async(name,email,token)=>{
  try {
      const transporter = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:587,
          secure:false,
          requireTLS:true,
          auth:{
            user:"12190099.gcit@rub.edu.bt",
            pass: "qlszefmvnjjdymju"
          }
      });

      const mailOptions = {
          from:"12190099.gcit@rub.edu.bt",
          to: email,
          subject:'For Reset password',
          html:`<p> Hii `+name+`, Please copy the token </p><br>
          <h1>`+token+`</h1><br> 
          <p>enter OTP to reset your password</p>` 
      }
      transporter.sendMail(mailOptions,function(error,info){
          if(error){
              console.log(error);
          }
          else{
              console.log("Mail has been sent:- ",info.response);
          }
      })
      
  } catch (error) {
      res.status(400).send({success:false,msg:error.message})
  }
}
exports.signupVerification = async(req,res)=>{
  try {
      const recievedname = req.body.name
      name = recievedname
      const recievedemail = req.body.email
      email=recievedemail
      const randomString = randomstring.generate(6);
      OTP = randomString;
      console.log(OTP)
      sendResetPasswordMail(recievedname,recievedemail,randomString); 
      
      res.status(200).json({
          status:'success',
          msg:"please check your mail."})

  } catch (error) {
      res.status(400).json({
          error:err.message});
  }
}
exports.enter_OTP = async(req,res)=>{
  try {
      const OTP_recieved = req.body.otp;
      if(OTP_recieved===OTP){
          res.status(200).json({status:'success',msg:"Correct OTP"});
      }
      else{
          res.status(200).json({error:'error',msg:"OPT invalid"});
      }
  } catch (error) {
      res.status(500).json({error:err.message});
  }

}




exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        console.log("users ", users);
        res.status(200).json({data:users, status: 'success'})
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id, req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  
  exports.updateMe = async (req, res, next) => {
    try {
      if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("Not for password updates", 400));
      }
      console.log(req.body);
      // //filtration
      const filterBody = filterObj(
        req.body,
        "name",
        "dob",
        "profession",
        "photo"
      );
      const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
      },{new:true});
      
      res.status(200).json({
        status: "success",
        data: { user: updateUser },
      });
    } catch (err) {
      console.log("Here");
      res.status(500).json({ error: err.message });
    }
  };
  


