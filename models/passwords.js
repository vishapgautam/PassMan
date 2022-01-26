const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');


const PasswordSchema= mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      userId:{
          type:String,
          required:true,

      },
      key:{
          type:String,
          required:true
      },
      value:{
          type:String,
          required:true
      }
})

module.exports=mongoose.model("Password",PasswordSchema)