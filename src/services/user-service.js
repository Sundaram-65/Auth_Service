const {UserRepository} =require('../repository/user-repository.js');
const jwt = require('jsonwebtoken');
const userRepository= new UserRepository();
const {JWT_KEY}=require('../config/serverConfig.js');
class UserService{

    async createUser(data){

        try {
            const user=await userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
    }

    async deleteUser(userId){

        try {
            const user=await userRepository.deleteUser(userId);
            return user;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
    }

    // get
    async getUser(userId){
        try {
            const user=userRepository.getUser(userId);
            return user;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
        }

        createToken(user){
            try {
                const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
                return result;
            } catch (error) {
                console.log('Something went wrong in token creation');
                throw error
            }
        }
        verifyToken(token){
            try {
                const response=jwt.verify(token,JWT_KEY);
                return response;
            } catch (error) {
                console.log('Something went wrong in token validation');
                throw error
            }
        }
    
}
module.exports = {
    UserService
};