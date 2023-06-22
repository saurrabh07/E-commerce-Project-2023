import mongoose from "mongoose";

const connectDb =async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // console.log(`Connected to MongoDb Database ${conn.connection.host}`)

    }
    catch(error){
        console.log(`Error in MongoDb ${error} `);
    }
}

export default connectDb ;