const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

const userRouter = require('./Routes/userRoutes')



app.use('/api/v1/users', userRouter)

module.exports = app
