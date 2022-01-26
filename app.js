const express=require('express')
const cookieParser=require("cookie-parser")
const morgan=require('morgan')
require('dotenv').config()
const path=require('path')
const app=express()
const http=require('http')
const PORT=process.env.PORT
const bodyParser = require('body-parser');

//set morgan for development only
// app.use(morgan('dev'))

//set view engine and bodyparser
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true,
  parameterLimit: 50000
}));
app.use(bodyParser.json());


//Set cookie parser
app.use(cookieParser())


//database
require('./server/mongo')



//routes
const homeRoute=require('./routes/home')
const mainpageRoute=require('./routes/mainpageRoute')
const passwordsRoute=require('./routes/passwordsRoute')

//Middleware routes
app.use('/',homeRoute)
app.use('/mainpage',mainpageRoute)
app.use('/mainpage/passwords',passwordsRoute)




//server
const server=http.createServer(app)
server.listen(PORT,()=>{
    // console.log("Server is listining on port 4000....")
})