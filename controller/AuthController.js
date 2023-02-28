const User=require('./../model/user');
const jwt=require('jsonwebtoken')
exports.signup=async(req,res,next)=>{
        try{
            const data=req.body
            // const password=req.body.password
            // const conpassword=req.body.confrimPassword
            // if(password===conpassword){
              const created=await User.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                address:req.body.address,
                password:req.body.password,
                confrimPassword:req.body.confrimPassword,
              });
              const token=jwt.sign({id:User._id},process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES_IN
              })
              res.status(202).json({
                status:'created succefully',
                token:token,
                data:{
                  created
                }
              })
      
            // }else{
            //   res.status(404).json({
            //     status:'fail',
            //     message:err.message
            //   });
      
            // }

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
          });
    }
}
exports.login=async(req,res,next)=>{
  const token=jwt.sign({id:User._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })
  const {email,password}=req.body
  if(!email||!password){
    res.status(404).json({
      status:'fail',
      message:'please provide email and password'
    });
  }
  const user=await User.findOne({email:email}).select('+password');
 
     if(!await user.comparePassword (password,user.password) || !user){
      res.status(404).json({
        status:'fail',
        message:'password not match & user not found'
      });
     }
     res.status(200).json({
      statusbar:'success',
      token:token,
     })
}