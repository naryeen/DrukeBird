const express = require("express")
const cors = require('cors');

const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// Enable CORS for all routes
app.use(cors());

app.use(express.json())

const userRouter = require('./Routes/userRoutes')

app.use('/api/v1/users', userRouter)

module.exports = app
