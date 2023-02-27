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
image:[String],
features:[String],
details:{
    type:String,
    required:[true,'car detail is requires'],
    trim:true
},
createdAt:{
    type:Date,
    default:Date.now(),
    select:false
}
,
startDates:[Date],
ratingAverage:{
    type:Number,
},
discountPrice:{
    type:Number,
    validate:{
        validator:function(val){
            return val<this.carPrice
        },

    message:'discount ({VALUE}) must be less actual price'
    }
}
})
// carsSchema.pre('save',function(){
//     console.log(this)
// })
const car=mongoose.model('car',carsSchema)
module.exports=car;