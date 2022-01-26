const express=require('express')
const router=express.Router()

const passwordsController=require('../controllers/passwordsController')


router
     .get('/:userId',passwordsController.getPass)//also verify userToken using authuntication middleware in each request here
     .post('/add/:userId',passwordsController.addPass)
     .delete('/:objectId',passwordsController.deletePass)
     .patch('/:objectId',passwordsController.updatePass)

module.exports=router