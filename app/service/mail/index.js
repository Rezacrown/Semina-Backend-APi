const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const { gmail, password } = require("../../config");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  from: "Semina Admin",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: "Semina Admin <no-reply@myapp.com>",
      to: email,
      subject: "Otp Code for Registration: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const otpForgetPassword = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/forgetPassword.html", "utf8");

    let message = {
      from: "Semina Admin <no-reply@myapp.com>",
      to: email,
      subject: "Otp Code for Registration: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const orderMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/order.html", "utf8");

    let message = {
      from: "Semina Admin <no-reply@myapp.com>",
      to: email,
      subject: "Order Detail: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, orderMail };
