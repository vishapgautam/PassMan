const User=require('../models/users')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
module.exports.home=(req,res)=>{
    res.status(200).render('home')
}

module.exports.signUpForm=(req,res)=>{
      res.status(200).render('signInForm')
}

module.exports.signUp=async(req,res)=>{
    const firstName=await req.body.firstName
    const lastName=await req.body.lastName
    const emailId=await req.body.emailId
    const password=await req.body.password
    if (!firstName||!lastName||!emailId||!password){
        res.status(404).json({success:'false',description:"Fields are missing"})
    }
    else{
        const email=await User.findOne({emailId:emailId})
        if (email){
            res.status(404).json({success:'false',description:"Email already exists"})
        }
        else{
        bcrypt.hash(password,5,async(err,hash)=>{
        var secretKey=process.env.SECRET_KEY||"vishap"
        const  token= jwt.sign(emailId,secretKey)
            const user=new User({
            firstName:firstName,
            lastName:lastName,
            emailId:emailId,
            password:hash,
            confirmPass:password,
            token:token
            })
            user.save(function(error,result){
                if (error){
                    res.status(400).json({success:false,error:error})
                }else{
                res.cookie("name",user.firstName,{
                    maxAge:90000,
                    httpOnly:true
                })
                res.cookie("Id",user._Id,{
                    maxAge:90000,
                    httpOnly:true
                })
                res.status(200).redirect('/mainpage/')
                }
          })
            //Now send this user to its new home page
        })
    }
    }
}

module.exports.logInForm=(req,res)=>{
    res.status(200).render('logInForm')
}

module.exports.logIn=async(req,res)=>{
      const emailId=req.body.emailId
      const password=req.body.password
      if(!emailId||!password){
          res.status(404).json({success:"false",description:"fields are missing"})
      }
      else{
          const user = await User.findOne({emailId:emailId})
          if (!user){
              res.status(404).json({success:"false",description:"email dosen't exist"})
          }else{
              bcrypt.compare(password,user.password,async(error,success)=>{
                  if (success){
                      res.cookie("Id",user._id,{
                          maxAge:900000,
                          httpOnly:true
                      })
                      res.cookie("name",user.firstName,{
                        maxAge:90000,
                        httpOnly:true
                    })
                    const secretkey=process.env.SECRET_KEY
                    const token=await jwt.sign(user._id,secretkey)
                    User.findByIdAndUpdate(user._id,{token:token},
                        (err,user)=>{
                          if (user)res.status(200).redirect('/mainpage/')
                          console.log(err)
                        }); 
                                    
                  }else{
                      res.status(200).json({success:"false",description:"password is incorrect"})
                  }
              })

          }
    }
}