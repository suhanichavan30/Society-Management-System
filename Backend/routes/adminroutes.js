const express=require('express');
const router=express.Router();
const Admin=require("../models/adminModel")

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email !== adminEmail || password !== adminPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Admin login successful" });
});

router.get("/admin-info",(req,res)=>{
    res.json({ email: process.env.ADMIN_EMAIL });
    res.json({ email: process.env.ADMIN_EMAIL });
})