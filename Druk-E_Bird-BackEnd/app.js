const express = require("express")
const path = require("path")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./Routes/userRoutes')
const ForgetPasswordRouter = require('./Routes/forgotPasswordRoutes')
const viewRouter = require('./Routes/viewRoutes')

app.use('/api/v1/users',userRouter)

app.use('/api/v1/',ForgetPasswordRouter)

app.use(express.static( 'users'));

app.use('/api/v1/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static( 'users'));

module.exports=app;
