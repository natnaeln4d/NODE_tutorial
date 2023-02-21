// const fs=require('fs')
const car=require("./../model/car")
// const cars=JSON.parse(fs.readFileSync(`${__dirname}/../json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`))
// exports.checkBody=(req,res,next)=>
// {
 
//   if(!req.body.price||!req.body.car){
//     res.status(404).json({
//       status:'fail',
//       message:"missing price || car"
//     })
//   }
//   res.status(201).json({
//     status:"success",
//     message:"created succesfully"
//   })

//   next()

// }
// exports.checkID=(req,res,next,val)=>{
//   console.log('id',req.params.id,'hey')
//   if(req.params.id*1>cars.length){
//    return res.status(404).json({
//       status:'fail',
//       message:'Invalied IDDDDD'
//     })

//   }
//   next()
//  }
exports.getCar=async(req,res)=>{

  //   console.log(req.params)
  // console.log(req.requestTime)
  try{
  const cars=await car.find()
    res.status(200).json({
      status:'success',
      requestTime:req.requstTime,
      data:{
        cars:cars
       
      }
    })
  }catch(err){
    res.status(500).json({
      status:'fail',
      message:err.message
    })
  }
  
  }
  exports.postCar=async(req,res) => {
    try{
    const newCar=await car.create(
      req.body
    
    )
    // const newId=[cars.length-1].id+1
    // const newCar=Object.assign({id:newId},req.body)
    // cars.push(newCar)
    // fs.writeFile(`${__dirname}/../json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`,JSON.stringify(cars),err=>{
      res.status(201).json({
        status:'success',
        data:{
          car:newCar
        }
  
       })
  
  
    // })
      }catch(err){
       res.status(404).json({
        status:'fail',
        message:err.message
       })
      }
    
  }
  exports.getByid=async(req,res)=>{
    // console.log(req.params)
    // const id=req.params.id*1
    // const car=cars.find(el=>el.id===id)
    // // if(!car){
    // //  return res.status(404).json({
    // //     status:"fail",
    // //     message:"Invailed Id"
    // //   })
    // // }
    // console.log(req.params)
    try{
  const oneCar=await car.findById(req.params.id)
    res.status(200).json({
      status:'success',
      result:req.params.id,
      data:{
        cars:oneCar
      }
    })
  }catch(err){
    res.status(404).json({
     status:'fail',
     message:err.message
    })
   }
  }
    exports.patchCar=async(req,res)=>{
      // if(!req.params.id * 1 > cars.length){
      //   return res.status(404).json({
      //     status:'fail',
      //     message:'Invailed id'
      //   }
      //   )
      // }
      try{
const updatedOne=await car.findOneAndUpdate(req.params.id,req.body,{ 
  new:true,
  runValidators:true
})
   
      res.status(201).json({
        status:'updated',
        data:{
           cars:updatedOne
        }
      })
    }catch(err){
      res.status(404).json({
       status:'fail',
       message:err.message
      })
     }
    }
    exports.deleteCar=async(req,res)=>{
    try{
      const deleteOne=await car.findByIdAndDelete(req.params.id)
      res.status(202).json({
        status:'delete',
        message:'deleted succesfully'
      })
    }catch(err){
      res.status(404).json({
       status:'fail',
       message:err.message
      })
     }
    }