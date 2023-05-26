const User = require('../Models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError.js')
const { Name, Email } = require('./userController');



const signToken = (id) => {
    return jwt.sign({id},
        process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN,
        })
}
const createSendToken = (user, statusCode, res) =>
{
    const token =signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, 
        ),
        httpOnly: true,
    }
    res.cookie('jwt',token, cookieOptions)
    res.status(statusCode).json({
        status:"success",
        token,
        data : {
            user
        }
    })
}

exports.signup=async(req, res, next)=> {
    try
    {   
        var name = Name
        var email = Email
        
        // const{email} = req.body
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"user already exist"})

    const newUser = await User.create(name,email,req.body)
    createSendToken(newUser, 201, res)

    //res.status(201).json({status:"success"})
}
    catch(err)
    {   
        res.status(400).json({message: Object.values(err.errors).map(val => val.message)[0]});
        
    } 
}

exports.login = async(req, res, next)=>
{
    try{
        const {email, password} = req.body
        
        //1) check if email and password exist
        if(!email || !password)
        {
            //return next(new AppError('Please provide an email and password!', 400))
            return res.status(400).json({message:"Please provide an email and password"})
        }

        //2) Check if user exists && password is correct

        const user = await User.findOne({email}).select('+password')
        
        //const correct = await user.correctPassword(password, user.password)

        if(!user || !(await user.correctPassword(password, user.password)))
        {
            //return next(new AppError('Incorrect email or password', 401))
            return res.status(401).json({message:"Incorrect email or password"})
        }
        //3) If everything ok, send token to client
        createSendToken(user, 200, res)
        // const token = signToken(user._id)
        // res.status(200).json({
        //     status: 'success',
        //     token,
        // })
    }
    catch(err)
    {
        res.status(500).json({error: err.message});

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
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
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
    
