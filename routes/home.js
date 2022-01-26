const express=require('express')
const router=express.Router()
const homeController=require('../controllers/homeController')

router
      .get('/',homeController.home)
      .get('/signUp',homeController.signUpForm)
      .post('/signUp',homeController.signUp)
      .get('/logIn',homeController.logInForm)
      .post('/logIn',homeController.logIn)


module.exports=router