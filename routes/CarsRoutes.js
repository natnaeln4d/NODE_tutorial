const express=require('express');
const carController=require('./../controller/CarsController')
const router=express.Router()
// router.param('id',carController)
router.route('/').get(carController.getCar).post(carController.postCar);
router.route('/:id').get(carController.getByid).patch(carController.patchCar).delete(carController.deleteCar)
module.exports=router;