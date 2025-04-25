const express = require("express");
const router = express.Router();
const Guest = require("../models/guestmodel.js");

router.post("/guest", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newGuest = new Guest({ name, email });
        await newGuest.save();

        res.status(201).json({ message: "Guest data saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/allguests", async (req, res) => {
    try {
        const guests = await Guest.find().sort({createdAt:-1}); 
        res.status(200).json(guests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
