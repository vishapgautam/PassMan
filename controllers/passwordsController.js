const Password=require('../models/passwords')
const User=require("../models/users")
const bcrypt=require("bcryptjs")

module.exports.getPass=async(req,res)=>{     
     try{
        const emailId=req.body.emailId
        const password=req.body.password
        if (!emailId | !password){
            res.status(400).render('notifyError',{response:"Fields are Missing",message1:"Some of your fields are missing please go back to retry.",message2:"If you want you can also go back to homepage.",button1:"Back",button2:"Home Page"})
        }else{
         const user=await User.findOne({emailId:emailId})
         const confirm=await bcrypt.compare(password,user.password)
        if (confirm){
         const passwords=await Password.find({userId:user._id}).select("-__v -userId")
         res.status(200).render('mainPage',{passwords:passwords})
        }else{
            res.status(400).render('notifyError',{response:"Invalid password or Email",message1:"Please go back and enter the right password and email.",message2:"If you don't have account then go to the homepage and signup .",button1:"Retry",button2:"Home Page"})
        }
        }
    }catch(err){
        res.status(400).render('notifyError',{response:"Invalid password or Email",message1:"Please go back and enter the right password and email.",message2:"If you don't have account then go to the homepage and signup .",button1:"Retry",button2:"Home Page"})
     }
    }

module.exports.addPass=async(req,res)=>{
    const emailId=req.body.emailId
    const key=req.body.key
    const value=req.body.value
    const user=await User.find({emailId:emailId})
    if (!user[0]){
        res.status(400).render('notifyError',{response:"User Dosen't exists",message1:"Please go back and enter the right Email.",message2:"If you don't have account then go  to the homepage and signup .",button1:"Retry",button2:"Home Page"})
    }else{
        const password= new Password({
        userId:user[0]._id,
        key:key,
        value:value
    })
    password.save(function(err,result){
        if (err) res.status(400).json({success:"false",error:err})
        else res.status(200).render('notify',{response:"Added successfuly",message1:"Your password is Added successfully.Now you can go back to get your passwords page by clicking back.",message2:"If you want to go back to main page click mainpage below.",button1:"Your Pass",button2:"Main Page"})
    })
}}

module.exports.deletePass=async(req,res)=>{
    const objId=await req.params.objectId
    Password.findByIdAndDelete({_id:objId},function(err,result){
        if (!err) res.status(200).render('notify.ejs',{response:"Deleted successfuly",message1:"Your password is deleted successfully.Now you can go back to get your passwords page by clicking back.",message2:"If you want to go back to main page click mainpage below.",button1:"Back",button2:"Main Page"})
    })

}

module.exports.updatePass=async(req,res)=>{
     const objId=await req.params.objectId
     const key=await req.body.key
     const value=await req.body.value
     Password.findByIdAndUpdate({_id:objId},{$set:req.body},function(err,result){
         if (err) res.status(400).json({success:"false",error:err})
         else res.status(200).render('notify',{response:"Updated successfuly",message1:"Your password is updated successfully.Now you can go back to get your passwords page by clicking back.",message2:"If you want to go back to main page click mainpage below.",button1:"Back",button2:"Main Page"})
     })
}
module.exports.getupdateform=(req,res)=>{
    res.render('updateform')
}