const express=require('express')
const router=express.Router()

const passwordsController=require('../controllers/passwordsController')

//before these operations authcontrollers should also be used as a middleware 
router
     .post('/getallpass',passwordsController.getPass)//also verify userToken using authuntication middleware in each request here
     .post('/add',passwordsController.addPass)
     .get('/delete/:objectId',passwordsController.deletePass)
     .get('/update/:objectId',passwordsController.getupdateform)
     .post('/update/:objectId',passwordsController.updatePass)

module.exports=router