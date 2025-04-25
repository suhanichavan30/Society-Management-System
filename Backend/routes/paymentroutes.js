

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User=require('../models/userModel.js')


router.get("/payment-status/:username", async (req, res) => {
  try {
    const { username } = req.params;
       const user = await User.findOne({ username });

    if (!user) {
      console.warn("User not found:", username);
      return res.json({ status: "Not Paid", roomfee: 0 });
    }
    res.json({ status: user.status || "Not Paid", roomfee: user.roomfee || 0 });

  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ success: false, message: "Error fetching payment status" });
  }
});

// Update payment status

router.post("/update-payment-status", async (req, res) => {
  const { userName, status,roomfee } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: userName },
      { $set: { status,roomfee } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Update Payment Error:", error);
    res.status(500).json({ message: "Error updating status" });
  }
});

// Payment processing
// router.post("/pay", async (req, res) => {
//   try {
//     const { userName, roomfee } = req.body;
//     const user = await User.findOne({ username: userName });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const amount = roomfee * 100; // Convert to smallest currency unit (paise)

//     const customer = await stripe.customers.create({
//       name: userName,
//       description: `Customer for ${userName}`,
//     });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "inr",
//       payment_method_types: ["card"],
//       customer: customer.id,
//       description: "Maintenance Payment",
//     });

//     // Update user status
//     await User.findOneAndUpdate(
//       { username: userName },
//       { $set: { status: "Paid" } },
//       { new: true }
//     );

//     res.json({ success: true, clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Payment error:", error);
//     res.status(500).json({ success: false, message: "Payment failed" });
//   }
// });


// Payment processing
router.post("/pay", async (req, res) => {
  try {
    const { userName, roomfee } = req.body;
    const user = await User.findOne({ username: userName });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const amount = roomfee * 100;

    const customer = await stripe.customers.create({
      name: userName,
      description: `Customer for ${userName}`,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      customer: customer.id,
      description: "Maintenance Payment",
    });

    // Update user status
    await User.findOneAndUpdate(
      { username: userName },
      { $set: { status: "Paid" } },
      { new: true }
    );

    // ✅ Send confirmation email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", "yahoo", etc.
      auth: {
        user: process.env.EMAIL_USER,       // your email
        pass: process.env.EMAIL_PASSWORD,   // your email password or app password
      },
    });

    const mailOptions = {
      from: `"SocietyConnect" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Maintenance Payment Confirmation",
      html: `<p>Dear ${user.username},</p>
             <p>✅ Your home maintenance fee has been <strong>successfully paid</strong>.</p>
             <p>Thank you for your timely payment. Your contribution helps us maintain the smooth functioning and upkeep of our community.</p>
             
             <p>Regards,<br/>Suhani <br/>SocietyConnect Admin<br/></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
});


router.get("/paid-users", async (req, res) => {
  try {
    const paidUsers = await User.find({ status: "Paid" }, "username email roomfee room wing flattype");
    res.json({ success: true, users: paidUsers });
  } catch (error) {
    console.error("Error fetching paid users:", error);
    res.status(500).json({ success: false, message: "Error fetching paid users" });
  }
});

router.get("/unpaid-users", async (req, res) => {
  try {
    const unpaidUsers = await User.find({ status: { $ne: "Paid" } }, "username email room wing flattype");
    res.json({ success: true, users: unpaidUsers });
  } catch (error) {
    console.error("Error fetching unpaid users:", error);
    res.status(500).json({ success: false, message: "Error fetching unpaid users" });
  }
});

module.exports = router;


