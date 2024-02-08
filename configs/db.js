import mongoose from "mongoose";

async function connectToDb() {
try{
    if(mongoose.connections[0].readyState){
        return true;
    }
    else{
      await  mongoose.connect("mongodb://localhost:27017/quiz");
      console.log("connected to db");
    }
}
catch(error){
    console.log("Db Error ",error.message);
}

}

export default connectToDb;
