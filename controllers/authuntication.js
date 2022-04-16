const jwt=require('jsonwebtoken')
const User=require('../models/users')



//This controller authenticate the token in users database and the token is valid only for 5 seconds
module.exports.auth=async(req,res,next)=>{
     const id=req.params.id
     var host=req['rawHeaders'][1]
     var browser=req['rawHeaders'][9]
     if (!id) res.status(404).json({success:"false",description:"id not found"})
     const user=await User.findById(id)
     User.findByIdAndUpdate({_id:id},{$push:{logs:{date:new Date().toLocaleString(),host:host,browser:browser}}},function(error,result){
         if (error)  res.status(404).json({success:"false",description:"error saving logs"})
         const token=user.token
         if (!token) res.status(404).json({success:"false",description:"token not found in user's database"})
         jwt.verify(token,process.env.SECRET_KEY,(error,verifiedJwt)=>{
        if (verifiedJwt){
             next()
          }
         if (error)
         {
            res.status(400).render('notifyError',{response:"Your Token is expired",message1:"You need to login again.",message2:"Please go back to login again or go to homepage.",button1:"Back",button2:"Home Page"})
         }
       
       }
     )})  }
     