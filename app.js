const express=require('express')
const fs=require('fs')
const url=require('url')
const morgan=require('morgan')
const CarsRouter=require('./routes/CarsRoutes')
const UserRouter=require('./routes/UserRoute')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const app=express()
console.log(process.env)
if(process.env.NODE_ENV==='developement')
{
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=>{
  req.requestTime=new Date().toISOString()
  next()
})

// app.get('/cars',getCar)
// app.post('/cars',postCar)
// app.get('/cars/:id',getByid)
// app.patch('/cars/:id',patchCar)
// app.delete('/cars/:id',deleteCar)
app.use('/cars',CarsRouter)
app.use('/users',UserRouter)
module.exports=app;