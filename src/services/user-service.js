const {UserRepository} =require('../repository/user-repository.js');

const userRepository= new UserRepository();
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
    
}
module.exports = {
    UserService
};