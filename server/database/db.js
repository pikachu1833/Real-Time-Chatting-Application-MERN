
import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const Connection=async()=>{
const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-yyahlud-shard-00-00.dfe20gx.mongodb.net:27017,ac-yyahlud-shard-00-01.dfe20gx.mongodb.net:27017,ac-yyahlud-shard-00-02.dfe20gx.mongodb.net:27017/?ssl=true&replicaSet=atlas-mva0ax-shard-0&authSource=admin&retryWrites=true&w=majority&appName=clone-whatsapp`;
    try{
   await  mongoose.connect(URL, { useUnifiedTopology: true});
console.log('Database connected successfully'); 
}catch(error)
    {
console.log('Error while connecting with the database',error.message);
    }
}
export default  Connection;