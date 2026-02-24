const mongoose=require('mongoose');

const conectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected")
    }catch(err){
        console.log("database is not connected",err)
    }

}

module.exports=conectDB;