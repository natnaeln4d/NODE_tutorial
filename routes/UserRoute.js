const express=require('express');
const userController=require('./../controller/UserController')
const AuthController=require('./../controller/AuthController')
const router=express.Router()
router.route('/login').post(AuthController.login)
router.route('/signup').post(AuthController.signup)
router.route('/').get(userController.getAlluser).post(userController.addUser)
router.route('/:id').get(userController.getUser).delete(userController.deleteUser)
module.exports=router;