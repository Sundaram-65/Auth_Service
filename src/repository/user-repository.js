const {User}=require('../models/index');

class UserRepository{

    // create
    async createUser(data){
        try {
            const user=await User.create(data);
            return  user;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw error;
        }
    }

    // delete
    async deleteUser(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw error;
        }
    }

    // update
    async getUser(userId){
        try {
            const user=await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user=await User.findOne({
                where:{
                    email:userEmail
                }
            })
            return user;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw error;
        }
    }
    
}
module.exports= {
    UserRepository
};
