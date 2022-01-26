const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');


const UserSchema=mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      firstName:{
          type:String,
          required:true,

      },
      lastName:{
          type:String,
      },
      emailId:{
          type:String,
          required:true
      },
      password:{
          type:String,
          required:true,
      },
      confirmPass:{
          type:String,
          required:true
      },
       token:{type:String
     },
      mobileNumber:{
          type:Number
      },
      passwords:{type:Array}

})

module.exports=mongoose.model("User",UserSchema)