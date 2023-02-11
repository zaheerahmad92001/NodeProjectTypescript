// export {}
require('dotenv').config()
const mongoose = require("mongoose");
const {MONGO_DB_URL}=process.env;
const connectDB = async()=>{
    try{
       mongoose.set('strictQuery', true)
      const connection = await mongoose.connect(MONGO_DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      }) 
     console.log('Database connected successfully' ,connection.connection.name ,connection.connection.host) 
    }catch(error){
        console.log('error in DatabaseConnection',error)
    }
}
export default connectDB
// module.exports = connectDB
    