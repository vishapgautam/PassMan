const jwt=require('jsonwebtoken')
const User=require('../models/users')
module.exports=async(req,res,next)=>{
     const id=await req.cookies.Id
     if (!id) res.status(404).json({success:"false",description:"cookies not found"})
     const user=await User.findById(id)
     const token=user.token
     if (!token)res.status(404).json({success:"false",description:"token not found in user's database"})
    const result= jwt.verify(token,process.env.SECRET_KEY)
    if (result){
         next()
    }
    else{
        res.status(400).json({success:"false",description:"token is not valid"})
    }   
    
}