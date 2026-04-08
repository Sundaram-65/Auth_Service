const express=require('express');
const {PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser')

const app =express();

const prepareAndStartServer=async()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server started on Port: ${PORT}`)
    })
    // const {UserRepository}=require('./repository/user-repository');
    // const repo=new UserRepository();
    // const response=await repo.getUser(2);
    // console.log(response);
}

prepareAndStartServer();