const dotenv=require('dotenv')
const car=require("./../model/car")
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'})
const fs=require('fs')
// const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(process.env.DATABASE_LOCAL,{useNewUrlParser:true}).then(con=>{
    console.log('connected to database')
})
const carr=JSON.parse(fs.readFileSync(`${__dirname}/data.json`,'utf-8'));
const importData=async()=>{
    try{
    const Allcar=await car.create(carr)
    console.log("created successfull")
    }catch(err){
        console.log(err)
    }
}
const deleteData=async()=>{
    try{
    const Allcar=await cars.deleteMany()
    console.log("deleted successfull")
    }catch(err){
        console.log(err)
    }
}
console.log(process.argv)

if(process.argv[2]==="--importData"){
    importData()
}
else if(process.argv[2]==="--deleteData"){
    deleteData()
}