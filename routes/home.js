const express=require('express')
const router=express.Router()
const homeController=require('../controllers/homeController')
const mainpageController=require('../controllers/mainpageController')
const passwordsController=require('../controllers/passwordsController')

router
      .get('/',homeController.home)
      .get('/signUp',homeController.signUpForm)
      .post('/signUp',homeController.signUp)
      .get('/getpass',homeController.logInForm)
      .post('/logIn',homeController.logIn)
      .get('/addpass',homeController.addpass)
      .get('/genpass',mainpageController.generatePass)
      .get('/genCustom',passwordsController.custompass)


module.exports=router