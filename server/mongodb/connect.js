import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
};

export default connectDB;
