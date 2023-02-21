const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_LOCAL,{useNewUrlParser:true}).then(con=>{
    // console.log('connected to database',con.connection)
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
module.exports=car;