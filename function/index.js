/* eslint-disable max-len */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user, // Load email user from Firebase environment config
    pass: functions.config().email.pass, // Load email password from Firebase environment config
  },
});

// Firebase Cloud Function to send emails
exports.sendPurchaseEmails = functions.https.onCall(async (data, context) => {
  const {buyerEmail, sellerEmail, productTitle, productPrice} = data;

  try {
    // Send email to Buyer
    await transporter.sendMail({
      from: functions.config().email.user,
      to: buyerEmail,
      subject: "Purchase Confirmation",
      text: `Thank you for purchasing "${productTitle}" for $${productPrice}!`,
    });

    // Send email to Seller
    await transporter.sendMail({
      from: functions.config().email.user,
      to: sellerEmail,
      subject: "Artwork Sold!",
      text: `Your artwork "${productTitle}" has been sold for $${productPrice}!`,
    });

    console.log("Emails sent successfully!");
    return {success: true, message: "Emails sent successfully!"};
  } catch (error) {
    console.error("Error sending emails:", error);
    throw new functions.https.HttpsError("internal", "Failed to send emails.");
  }
});
