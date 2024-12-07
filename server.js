const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // To load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON data in incoming requests

// Endpoint to send emails
app.post("/send-email", async (req, res) => {
  const { buyerEmail, sellerEmail, productTitle, productPrice } = req.body;

  const sendEmailPayload = {
    personalizations: [
      {
        to: [{ email: buyerEmail }],
        subject: "Purchase Confirmation",
      },
      {
        to: [{ email: sellerEmail || "default-seller@example.com" }],
        subject: "Artwork Sold!",
      },
    ],
    from: { email: process.env.SENDGRID_EMAIL }, // Verified email address
    content: [
      {
        type: "text/plain",
        value: `Purchase Confirmation:\nThank you for purchasing "${productTitle}" for $${productPrice}!\n\nArtwork Sold:\nYour artwork "${productTitle}" has been sold for $${productPrice}!`,
      },
    ],
  };

  try {
    // Send email via SendGrid API
    await axios.post("https://api.sendgrid.com/v3/mail/send", sendEmailPayload, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error.response?.data || error.message);
    res.status(500).send({ message: "Failed to send emails." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
