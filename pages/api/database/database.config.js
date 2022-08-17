import mongoose from 'mongoose';

const DBCONNECT = async () => {
    await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true, // CURRENT URL STRING PARSER IS DEPRECATED WARNING REMOVED
        useUnifiedTopology: true // CURRENT SERVER DISCOVERY AND MONITORING ENGINE IS DEPRECATED WARNING REMOVED
    }).then(()=>{
        console.log("DATABASE CONNECTED!") // IF DATABASE CONNECTED 
    }).catch((error)=>{
        console.log(`DATABASE CONNECTED ERROR! ${error}`) // IF DATABASE NOT CONNECTED
    })
}
export default DBCONNECT;