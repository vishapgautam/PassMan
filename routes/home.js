const express=require('express')
const router=express.Router()
const homeController=require('../controllers/homeController')
const mainpageController=require('../controllers/mainpageController')

router
      .get('/',homeController.home)
      .get('/signUp',homeController.signUpForm)
      .post('/signUp',homeController.signUp)
      .get('/getpass',homeController.logInForm)
      .post('/logIn',homeController.logIn)
      .get('/addpass',homeController.addpass)
      .get('/genpass',mainpageController.generatePass)


module.exports=router