const express=require('express')
const router=express.Router()
const mainpageController=require('../controllers/mainpageController')
const authunticationController=require('../controllers/authuntication')


router
     .get('/',authunticationController,mainpageController.home)
     .post('/generatePass',mainpageController.generatePass)


module.exports=router