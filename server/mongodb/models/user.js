import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        collection: "admin",
    }
);

const UserSchema = mongoose.model("User", User);

export default UserSchema;
