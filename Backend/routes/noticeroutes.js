const express = require("express");
const router = express.Router();
const Notice = require("../models/noticeModel.js");

router.post("/addnotice", async (req, res) => {
    try {
        const { title,desc,venue} = req.body;

        if (!title || !desc) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newNotice = new Notice({ title,desc,venue,createdAt: new Date()  });
        await newNotice.save();

        res.status(201).json({ message: "Notice Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/allnotices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 }); // Sort in descending order
        res.status(200).json(notices);
    } catch (error) {
        console.error("Error fetching notices:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/deletenotice/:id", async (req, res) => {
    try {
      await Notice.findByIdAndDelete(req.params.id);
      res.json({ message: "Notice deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notice" });
    }
  });

module.exports=router;