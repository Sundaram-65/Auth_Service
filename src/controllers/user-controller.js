const {UserService}=require('../services/user-service');

const userService=new UserService();
const createUser=async(req,res)=>{
    try {
        const response=await userService.createUser({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            message:'Succesfully created a new user',
            data:response,
            success:true,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        })
    }
}

module.exports={
    createUser
}