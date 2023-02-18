const fs=require('fs')
const cars=JSON.parse(fs.readFileSync(`${__dirname}/../json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`))
exports.checkBody=(req,res,next)=>
{
 
  if(!req.body.price||!req.body.car){
    res.status(404).json({
      status:'fail',
      message:"missing price || car"
    })
  }
  res.status(201).json({
    status:"success",
    message:"created succesfully"
  })

  next()

}
exports.checkID=(req,res,next,val)=>{
  console.log('id',req.params.id,'hey')
  if(req.params.id*1>cars.length){
   return res.status(404).json({
      status:'fail',
      message:'Invalied IDDDDD'
    })

  }
  next()
 }
exports.getCar=(req,res)=>{

    console.log(req.params)
  console.log(req.requestTime)
    res.status(200).json({
      status:'success',
      requestTime:req.requstTime,
      data:{
        cars:cars
       
      }
    })
  
  }
  exports.postCar=(req,res)=>{
    const newId=[cars.length-1].id+1
    const newCar=Object.assign({id:newId},req.body)
    cars.push(newCar)
    fs.writeFile(`${__dirname}/../json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`,JSON.stringify(cars),err=>{
      res.status(201).json({
        status:'success',
        data:{
          car:newCar
        }
  
       })
  
  
    })
    
  }
  exports.getByid=(req,res)=>{
    console.log(req.params)
    const id=req.params.id*1
    const car=cars.find(el=>el.id===id)
    // if(!car){
    //  return res.status(404).json({
    //     status:"fail",
    //     message:"Invailed Id"
    //   })
    // }
    console.log(req.params)
    res.status(200).json({
      status:'success',
      data:{
        cars:car
      }
    })}
    exports.patchCar=(req,res)=>{
      if(!req.params.id * 1 > cars.length){
        return res.status(404).json({
          status:'fail',
          message:'Invailed id'
        }
        )
      }
   
      res.status(201).json({
        status:'updated',
        data:{
           cars:"Updated...."
        }
      })
    }
    exports.deleteCar=(req,res)=>{
      res.status(204).json({
        status:'delete',
        data:{
           cars:null
        }
      })
    }