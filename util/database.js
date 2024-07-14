const mongoose= require('mongoose');

async function dbConn(){
    try {
       await mongoose.connect(process.env.MONGO_DB_STRING);
        console.log("DATABASE CONNECTED SUCCESFULLY");
        

        
    } catch (error) {
        console.log("DATABASE ERROR ---",error);
        throw new Error("DATABASE ERROR ---")
        
    }
}
module.exports= dbConn;