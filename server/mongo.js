const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(`${process.env.MONGO_URL}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succesfully')
  })
  mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
  })
  mongoose.connection.on('error', error => {
    console.log('Mongo connection has an error', error)
    mongoose.disconnect()
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
  })