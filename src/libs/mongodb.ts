import mongoose from "mongoose";

/* Con esto de abajo no es necesario declarar process.env*/
const {MONGODB_URI} = process.env

if(!MONGODB_URI){
    throw new Error('MONGODB_URI must be defined')
}

export const connectDB = async () => {
    try {
    /*Con esto no es necesario declarar process.env*/
    const {connection} = await mongoose.connect(MONGODB_URI);

    if(connection.readyState === 1){
        console.log( 'Mongo DB connected');
        return Promise.resolve(true);
    }
     } catch (error){
        console.log(error);
        return Promise.reject(false);
    }
}