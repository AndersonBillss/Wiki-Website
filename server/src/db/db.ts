    import mongoose from 'mongoose';
    import dotenv from 'dotenv'
    dotenv.config()

    const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wiki'
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(err); // If it's not an Error instance, just log it directly
        }
        process.exit(1); // Exit process with failure
    }
    };

    export default connectDB;