const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
mongoose.connect(process.env.DATABASE_LOCAL,{useNewUrlParser:true}).then(con=>{
    // console.log('connected to database',con.connection)
})
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'first name is required'],
    },
    last_name:{
        type:String,
        required:[true,'last name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        // validate:[validator.isEmail,'provide valid email']
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    image:String,
    password:{
        type:String,
        required:[true,'password is rerquired'],
        minlength:8,
        select:false
    }, 
    confrimPassword:{
        type:String,
        required:[true,'confrim password is rerquired'],
        validate:{
            validator:function(el){
                return el===this.password
            }
        }
        

    }
}) 
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
     this.password=await bcrypt.hash(this.password,12)
     this.confrimPassword=undefined
     next()
})
userSchema.methods.comparePassword = async function (candidatePassword) {  
     const comparison = await bcrypt.compare(candidatePassword, this.password)   
    return comparison } 
// userSchema.method.correctPassword=async function(candidatePassword,userPassword){
//     return await bcrypt.compare(candidatePassword,userPassword)
// }
const User=mongoose.model('User',userSchema)
module.exports=User