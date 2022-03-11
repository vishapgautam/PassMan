const express=require('express')
const router=express.Router()
const mainpageController=require('../controllers/mainpageController')
const authunticationController=require('../controllers/authuntication')
const passwordsController=require('../controllers/passwordsController')

router
     .get('/',mainpageController.home)
     .post('/generatePass',mainpageController.generatePass)


module.exports=router