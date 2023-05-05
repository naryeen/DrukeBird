const User = require('../Models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError.js')

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
    //console.log("this is authcontoller",req)
    try
    {   
        
        const{email} = req.body
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"user already exist"})

    const newUser = await User.create(req.body)
    createSendToken(newUser, 201, res)

    //res.status(201).json({status:"success"})
}
    catch(err)
    {   
        // console.log("catch ", Object.values(err.errors).map(val => val.message)[0]);
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
