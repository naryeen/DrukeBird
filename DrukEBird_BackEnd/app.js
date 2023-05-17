const express = require("express")
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const cookieParser = require('cookie-parser')
const userRouter = require('./Routes/userRoutes')
const app = express()

app.use(cookieParser())
// Enable CORS for all routes
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/v1/users', userRouter)


//Staring the server
const port = 4001
//exports. imagepath = path.join(__dirname, 'assets/Users/')

module.exports = app
