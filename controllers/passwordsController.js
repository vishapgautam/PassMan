const Password=require('../models/passwords')

module.exports.getPass=async(req,res)=>{
  const userId=await req.params.userId
  const passwords=await Password.find({userId:userId},{userId:0,__v:0})      
     if (!passwords) res.status(400).json({success:"false",error:"passwords not found"})
    else res.status(200).json({success:"true",result:passwords})
        
    }
module.exports.addPass=async(req,res)=>{
    const userId=await req.params.userId
    const key=await req.body.key
    const value=await req.body.value
    const password= new Password({
        userId:userId,
        key:key,
        value:value
    })
    password.save(function(err,result){
        if (err) res.status(400).json({success:"false",error:err})
        else res.status(200).json({success:"true",result:result})
    })
}

module.exports.deletePass=async(req,res)=>{
    const objId=await req.params.objectId
    Password.findByIdAndDelete({_id:objId},function(err,result){
        console.log(result)
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