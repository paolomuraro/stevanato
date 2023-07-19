import express from "express";
import Error from "../mongodb/models/error.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    const errorCode = req.query.errorCode;
    try {
        const result = await Error.findOne({ code: errorCode }).exec();
        if (!result) {
            res.status(404).send("Error not found");
            return;
        }
        res.send(result);
    } catch (error) {
        console.error("Error searching for error:", error);
        res.status(500).send("Error searching for error");
    }
});

export default router;
