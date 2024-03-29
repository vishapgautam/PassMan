const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const res = require('express/lib/response');


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
      },
      confirmPass:{
          type:String,
      },
      profilePic:{
          type:String
      },

       token:{type:String
     },
      mobileNumber:{
          type:Number
      },
      passwords:{
          type:Array
      },
      logs:{
          type:Array
      }

})
UserSchema.pre('save', async function(next) {
    // Hash the password with cost of 12
    if (this.password){
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPass = undefined;
    next();
    }else{
        next()
    }
  });

module.exports=mongoose.model("User",UserSchema)