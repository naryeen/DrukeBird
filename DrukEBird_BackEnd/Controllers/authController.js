const User = require("../Models/userModels");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  console.log(req.headers)
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide an email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or password", 401));
    }
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.protect = async(req,res,next) =>{
  // console.log(req.headers)
  try{
      // 1) Getting token and check of it's there
      let token
      if(req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
      ){
          token = req.headers.authorization.split(' ')[1]
      }
      if(!token){
          return next(
              new AppError('you are not logged in! Please login in to get access.',401),
          )
      }
      // 2) Verification token
      // const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
      const decoded = await jwt.verify(token,process.env.JWT_SECRET)

      console.log(decoded) 
      // 3) Check if user still exists
      const freshUser = await User.findById(decoded.id)
      if(!freshUser){
          return next(
              new AppError('The user belonging to this token no longer exist',401),
          )
      }
      // Grant access to protected route
      req.user = freshUser;
      next()
  }
  catch(err){
      res.status(500).json({error:err.message});
  }
}

exports.updatePassword = async(req,res,next)=>{
  try{
      const user  = await User.findById(req.user._id).select('+password')
      if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
          return next(new AppError('Your current password is wrong',401))
      }
      user.password = req.body.password
      user.passwordConfirm = req.body.passwordConfirm
      await user.save()
      createSendToken(user,200,res)
  }
  catch(err){
      res.status(500).json({error:err.message});
  }
}


