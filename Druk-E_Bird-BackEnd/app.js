const express = require("express")
const path = require("path")
const app = express()
app.use(express.json())

const userRouter = require('./Routes/userRoutes')
const ForgetPasswordRouter = require('./Routes/forgotPasswordRoutes')
const viewRouter = require('./Routes/viewRoutes')
const checklistRouter = require('./Routes/CheckListRoutes')
const notificationRouter = require('./Routes/NotificationRoutes')

app.use('/api/v1/users',userRouter)

app.use('/api/v1/',ForgetPasswordRouter)


app.use('/api/v1/', viewRouter)
app.use('/api/v1/checkList',checklistRouter)
app.use('/api/v1/notifications', notificationRouter)

app.use(express.static(path.join(__dirname, 'views')))

module.exports=app;
