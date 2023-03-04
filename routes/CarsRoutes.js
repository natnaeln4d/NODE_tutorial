const express=require('express');
const carController=require('./../controller/CarsController')
const AuthController=require('./../controller/AuthController')
const router=express.Router()
// router.param('id',carController)

router.route('/getmin').get(carController.getmin)
router.route('/monthly-plan:year').get(carController.getmonthlyPlan)
router.route('/top-5-cheapCars').get(carController.cheapCars,carController.getCar)
router.route('/').get(AuthController.protected,carController.getCar).post(carController.postCar);
router.route('/:id').get(carController.getByid).patch(carController.patchCar).delete(carController.deleteCar)
module.exports=router;