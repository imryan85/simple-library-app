const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const axios = require("axios");

module.exports.queueEmail = async (to, subject, text, html) => {
  try {
    const endpoint = `${process.env.BULL_MQ_URI}/queue/email`;
    const msg = { 
      to, 
      subject, 
      text, 
      html,
    };
    await axios.post(endpoint, msg);
    
    return "Email queued"
  } catch (err) {
    throw err;
  }
}

module.exports.sendEmail = async (to, subject, text, html) => {
  try {
    const msg = { 
      to, 
      subject, 
      text: text + "\r\n\r\nSimple-Library-App", 
      html: html + "<br /><br />Simple-Library-App",
      from: "ryan.dev.noreply@gmail.com", 
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(msg);

    return "Email sent"
  } catch (err) {
    throw err;
  }
}
