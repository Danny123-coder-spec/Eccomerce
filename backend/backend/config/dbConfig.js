import mongoose from 'mongoose';

const dbConnect = async() => {
    try {
        if(mongoose.connection.readyState > 1) {
            return
        }
        mongoose.set("strictQuery", false);
    
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`DB Connected - ${conn}`)
    } catch (error) {
        console.log('Db disconnected', error)
        
    }
}

export default dbConnect;