const express=require('express');
const userController=require('./../controller/UserController')
const router=express.Router()

router.route('/').get(userController.getAlluser).post(userController.addUser)
router.route('/:id').get(userController.getUser).delete(userController.deleteUser)
module.exports=router;