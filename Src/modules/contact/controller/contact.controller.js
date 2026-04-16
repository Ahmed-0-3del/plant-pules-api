import { ContactModel } from "../../../../DB/models/Contact.js";
import nodemailer from "nodemailer";
import { handleError } from "../../../middleware/handelErorr.js";
import dotenv from "dotenv";
dotenv.config();

export const sendMessage = handleError(
  async (req, res, next) => {

    const { firstName, lastName, email, phone, message } = req.body;

    const newMessage = await ContactModel.create({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    res.status(201).json({
      status: "success",
      message: "Message sent"
    });
  }
);





export const getAllMessages = handleError(
  async (req, res, next) => {

    const messages = await ContactModel.find().sort({ createdAt: -1 });

    res.json({
      status: "success",
      results: messages.length,
      data: messages
    });
  }
);









export const getSingleMessage = handleError(
  async (req, res, next) => {

    const message = await ContactModel.findById(req.params.id);

    if (!message) {
      return next(new AppError("Message not found", 404));
    }

    //  تتحول read
    message.status = "read";
    await message.save();

    res.json({
      status: "success",
      data: message
    });
  }
);





export const replyToMessage = handleError(
  async (req, res, next) => {

    const { id } = req.params;
    const { reply } = req.body;

    const message = await ContactModel.findById(id);

    if (!message) {
      return next(new AppError("Message not found", 404));
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: "Reply from Plant System 🌱",
      text: reply
    });

    message.status = "read";
    await message.save();

    res.json({
      status: "success",
      message: "Reply sent"
    });
  }
);