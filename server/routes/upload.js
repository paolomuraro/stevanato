import express from "express";
import Error from "../mongodb/models/error.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
    const { code, description, jsonFile, pdfFile } = req.body;
    try {
        await Error.create({
            code,
            description,
            jsonFile,
            pdfFile,
        });
        res.status(201).json({ message: "Error created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
