import mongoose from "mongoose";

const Error = new mongoose.Schema(
    {
        code: String,
        description: String,
        jsonFile: String,
        pdfFile: String,
    },
    {
        collection: "errors",
    }
);

const ErrorSchema = mongoose.model("Error", Error);

export default ErrorSchema;
