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
// class ApiFeatures{
//  ApiFeatures(query,queryString){
//   this.query=query;
//   this.queryString=queryString;
//  }
//  filter(){
//   const queryObj={...this.queryString}
//   const excludeFields=['page','sort','limit','fields']
//   excludeFields.forEach(el=> delete  queryObj[el])
//    let queryStr=JSON.stringify(queryObj)
//   queryStr=queryStr.replace('/\b(gte|gt|lte|lt)\b/g',match=> `$${match}`)
//    this.query.find(JSON.parse(queryStr))
//    return this;
//  }
//  sort(){
//   if(this.queryString.sort){
//     const querySort=this.queryString.sort.split(',').join(' ')
//     this.query=this.query.sort(querySort)
//   }
//   else{
//     this.query=this.query.sort('-createdAt')
//   }
//   return this;
//  }
//  fields(){
//   if(this.queryString.fields){
//     const queryFields=this.queryString.fields.split(',').join(' ');
//     this.query=this.query.select(queryFields)
//   }
//   else{
//     this.query=this.query.select('-__v');
//   }
//   return this;
//  }
//  pagenate(){
//   const page=this.queryString.page*1 || 1
// const limit=this.queryString.limit*1 || 100
// const skip=(page-1)*limit
// this.query=this.query.skip(skip).limit(limit) 

// return this;
//  }
// }
exports.cheapCars=(req,res,next)=>{
  req.query.sort="carPrice"
  req.query.limit="2"
  req.query.fields="carPrice,image,carName"
  
  next()
}
exports.getCar=async(req,res)=>{


  //   console.log(req.params)
  // console.log(req.requestTime)
 
  const queryObj={...req.query}
  const excludeFields=['page','sort','limit','fields']
  excludeFields.forEach(el=> delete  queryObj[el])
  let queryStr=JSON.stringify(queryObj)
  queryStr=queryStr.replace('/\b(gte|gt|lte|lt)\b/g',match=> `$${match}`)
  // console.log(req.query.queryObj)
  // console.log(JSON.parse(queryStr))
  const query=car.find(JSON.parse(queryStr))
  try{

 
  // sorting
if(req.query.sort){
  const querySort=req.query.sort.split(',').join(' ')
  query.sort(querySort)
}
else{
  query.sort('-createdAt')
}
// fittring fields

if(req.query.fields){
  const queryFields=req.query.fields.split(',').join(' ');
  query.select(queryFields)

}
else{
 query.select('-__v');
}
// pagination
const page=req.query.page*1 || 1
const limit=req.query.limit*1 || 100
const skip=(page-1)*limit
query.skip(skip).limit(limit) 
if(req.query.page){
  const carCount=await query.countDocuments()
  if(skip>=carCount) throw new Error('Page not found')
}
// const features=new ApiFeatures(car.find(),req.query).filter().sort().fields().pagenate()
const card=await query;
    res.status(200).json({
      status:'success',
      requestTime:req.requstTime,
      data:{
        cars:card
       
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
    exports.getmin=async(req,res)=>{
      try{
        const stat=await car.aggregate([
          {
            $match:{carPrice:{$gte:100}}
          },
          {
            $group
            :{
            _id:'$carName',
            cars:{$sum:1},
            avgcarPrice:{$avg:'$carPrice'},
            mincarPrice:{$min:'$carPrice'},
            maxcarPrice:{$max:'$carPrice'}
          }},
          {$sort:{
            avgcarPrice:1
          }}
        ])
        res.status(200).json({
          status:'success',
          data:{
            stat
          }
        })

      }catch(err){
        res.status(500).json({
          status:'fail on this',
          message:err.message
        })
      }
    }
    exports.getmonthlyPlan=async()=>{
      try{
        const year=req.params.year*1
        const plan=await car.aggregate([
          {
            $unwind:'$startDates'
          },{
            $match:{
              $gte:new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          },{
            $group:{
              _id:{$month:'$startDates'},
              numCars:{$sum:1},
              cars:{$push:'$carName'}
            }
          }
        ]);
        res.status(200).json({
          status:'success',
          data:{
            plan
          }
        })

      }catch(err){
        res.status(200).json({
          status:'fail',
          message:err.message}
        )
      }

    }