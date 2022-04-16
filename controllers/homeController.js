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
    const confirmPass=req.body.confirmPass
    if (confirmPass!=password) res.status(400).json({success:'false',description:"password didn't matched"})
    if (!firstName||!lastName||!emailId||!password){
        res.status(404).json({success:'false',description:"Fields are missing"})
    }
    else{
        const email=await User.findOne({emailId:emailId})
        if (email){
            res.status(404).json({success:'false',description:"Email already exists"})
        }
        else{
               const  token= await jwt.sign(emailId,process.env.SECRET_KEY)
               const user=new User({
                firstName:firstName,
                lastName:lastName,
                emailId:emailId,
                password:password,
                confirmPass:password,
                token:token
             })
            user.save(function(error,result){
                if (error){
                    console.log(error)
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
        }
    }
    }

module.exports.logInForm=(req,res)=>{
    res.status(200).render('logInForm')
}

module.exports.logIn=async(req,res,next)=>{
    //   const emailId=req.body.emailId
    //   const password=req.body.password
    //   if(!emailId||!password){
    //       res.status(404).json({success:"false",description:"fields are missing"})
    //   }
    //   else{
    //       const user = await User.findOne({emailId:emailId})
    //       if (!user){
    //           res.status(404).json({success:"false",description:"email dosen't exist"})
    //       }else{
    //           bcrypt.compare(password,user.password,async(error,success)=>{
    //               if (success){
    //                   res.cookie("Id",user._id,{
    //                       maxAge:900000,
    //                       httpOnly:true
    //                   })
    //                   res.cookie("name",user.firstName,{
    //                     maxAge:90000,
    //                     httpOnly:true
    //                 })
    //                 const secretkey=process.env.SECRET_KEY
    //                 const token=await jwt.sign(user._id,secretkey)
    //                 User.findByIdAndUpdate(user._id,{token:token},
    //                     (err,user)=>{
    //                       if (user) next()
    //                       console.log(err)
    //                     }); 
                                    
    //               }else{
    //                   res.status(200).json({success:"false",description:"password is incorrect"})
    //               }
    //           })

    //       }
    // }

    try{
        const emailId=req.body.emailId
        const password=req.body.password
        if (!emailId | !password)
        {
            res.status(400).render('notifyError',{response:"Fields are Missing",message1:"Some of your fields are missing please go back to retry.",message2:"If you want you can also go back to homepage.",button1:"Back",button2:"Home Page"})
        }else
        {
            const user=await User.findOne({emailId:emailId})
        
            const confirm=await bcrypt.compare(password,user.password)
            if (confirm){
                res.cookie("Id",user._id,{maxAge:900000,httpOnly:true})
                res.cookie("name",user.firstName,{maxAge:90000,httpOnly:true})
                const token=await jwt.sign({id:user._id},process.env.SECRET_KEY,{ expiresIn:"5s" })
                User.findByIdAndUpdate(user._id,{token:token},async(err,user)=>{
                   if (user)
                   {
                      res.redirect(`/mainpage/passwords/getallpass/${user._id}`)
                   }else{
                       res.status(400).json({success:"false"})
                   }
                }); 
            }else{
                res.status(400).render('notifyError',{response:"Invalid password or Email",message1:"Please go back and enter the right password and email.",message2:"If you don't have account then go to the homepage and signup .",button1:"Retry",button2:"Home Page"})
            }
        }
    }catch(err){
    res.status(400).render('notifyError',{response:"Invalid password or Email",message1:"Please go back and enter the right password and email.",message2:"If you don't have account then go to the homepage and signup .",button1:"Retry",button2:"Home Page"})
 }
}

module.exports.addpass=(req,res)=>{
     res.render('addpass')
}