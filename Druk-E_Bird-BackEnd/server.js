const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')
const cors = require('cors');

const DB = process.env.DATABASE.replace('PASSWORD',
    process.env.DATABASE_PASSWORD,
    )
mongoose.set("strictQuery", false);
mongoose.connect(DB).then((con)=>{
    console.log('DB connection succesful')
}).catch(error =>console.log(error));

app.use(cors())

const port=4001
app.listen(port, ()=>{
    console.log(`Apprunning on port ${port}..`)})