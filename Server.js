const dotenv=require('dotenv')
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'})
const app=require('./app')
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(process.env.DATABASE_LOCAL,{useNewUrlParser:true}).then(con=>{
    console.log('connected to database',con.connection)
})
const carsSchema=new mongoose.Schema({
    carName:{
        type:String,
        required:[true,'car name is required'],
        unique:true
    },
    carPrice:{
        type:Number,
        required:[true,'car price is required']
},
carImage:{
  type:String
},
})

const car=mongoose.model('car',carsSchema)
// console.log(process.env)
const demoCar=new car({
    carName:'test',
    carPrice:1000,
    carImage:'test.jpg'
})
const another7=new car({
    carName:'Kial',
    carImage:'testwwe.jpg'
})
another7.save().then(res=>{
    console.log("done",res)
}).catch(err=>console.log(err))

const port=process.env.PORT|| 2500

app.listen(port,'127.0.0.1',()=>console.log(`server is running on${port}`))

