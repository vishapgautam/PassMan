const Password=require('../models/passwords')
const User=require("../models/users")
const bcrypt=require("bcryptjs")

module.exports.getPass=async(req,res)=>{
  const emailId=req.body.emailId
  const password=req.body.password
  if (!emailId | !password) res.status(400).json({success:"false",description:"provide email and password"})
     const user=await User.find({emailId:emailId})
     if (!user[0]) res.status(400).json({success:"false",description:"user dosen't exists"})
     const confirm=await bcrypt.compare(password,user[0].password)
     if (confirm){
         const passwords=await Password.find({userId:user[0]._id}).select("-__v -_id -userId")
         res.status(200).json({success:"true",length:passwords.length,result:passwords})
     } 
    }
module.exports.addPass=async(req,res)=>{
    const emailId=req.body.emailId
    const key=req.body.key
    const value=req.body.value
    const user=await User.find({emailId:emailId})
    if (!user[0]) res.status(400).json({success:"false",description:"email dosen't exists"})
    else{
    const password= new Password({
        userId:user[0]._id,
        key:key,
        value:value
    })
    password.save(function(err,result){
        if (err) res.status(400).json({success:"false",error:err})
        else res.status(200).json({success:"true",result:result})
    })
}}

module.exports.deletePass=async(req,res)=>{
    const objId=await req.params.objectId
    Password.findByIdAndDelete({_id:objId},function(err,result){
        if (!err) res.status(200).json({success:"true",description:"deleted"})
    })

}

module.exports.updatePass=async(req,res)=>{
     const objId=await req.params.objectId
     const key=await req.body.key
     const value=await req.body.value
     Password.findByIdAndUpdate({_id:objId},{$set:req.body},function(err,result){
         if (err) res.status(400).json({success:"false",error:err})
         else res.status(200).json({success:"true",updated:result})
     })
}