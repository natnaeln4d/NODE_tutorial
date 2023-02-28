const User=require('./../model/user')
exports.getAlluser=(req,res)=>{
    res.status(500).json({
      status:'server error',
      message:'this route is not defined'
    })
  }
  exports.addUser=async(req,res)=>{
    
    try{
      const data=req.body
      const password=req.body.password
      const conpassword=req.body.confrimPassword
      if(password===conpassword){
        const created=await User.create(data);
        res.status(202).json({
          status:'created succefully',
          data:{
            created
          }
        })

      }else{
        res.status(404).json({
          status:'fail',
          message:err.message
        });

      }
    

    }catch(err){
      res.status(404).json({
        status:'fail',
        message:err.message
      })
    }

  }
  exports.getUser=(req,res)=>{
    res.status(500).json({
      status:'server error',
      message:'this route is not defined'
    })
  }
  exports.updateUser=(req,res)=>{
    res.status(500).json({
      status:'server error',
      message:'this route is not defined'
    })
  }
exports.deleteUser=(req,res)=>{
    res.status(500).json({
      status:'server error',
      message:'this route is not defined'
    })
  }
