const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

const DB = process.env.DATABASE.replace('PASSWORD',
    process.env.DATABASE_PASSWORD,
    )
mongoose.set("strictQuery", false);
mongoose.connect(DB).then((con)=>{
    console.log('DB connection succesful')
}).catch(error =>console.log(error));

//Staring the server
const port = 3000
// exports. imagepath = path.join(__dirname, 'assets/Users/')

app.listen(port, () => {
    console.log(`App running on port ${port}..${__dirname}`)
})
