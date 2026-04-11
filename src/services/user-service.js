const {UserRepository} =require('../repository/user-repository.js');
const jwt = require('jsonwebtoken');
const userRepository= new UserRepository();
const {JWT_KEY}=require('../config/serverConfig.js');
const bcrypt=require('bcrypt')
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

    async signIn(email,plainPassword){
        try {
            // fetch  the user through the email
            const user=await userRepository.getByEmail(email);
            // compare incoming plain password with store encrypted password 
            const passwordMatch=this.checkpassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log('Password does not match');
                throw {error:'Incorrect Password'};
            }

            // step-3 if passwords match then create a token and send it to the user
            const newJWT=await this.createToken({email:user.email,id:user.id});
        
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in signin process');
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

        checkpassword(userInputPassword,encryptedPassword){
            try {
                const response=bcrypt.compareSync(userInputPassword,encryptedPassword);
                return response;
            } catch (error) {
                console.log('Something went wrong in password comparision');
                throw error;
            }
        }



    
}
module.exports = {
    UserService
};