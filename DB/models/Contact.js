

import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: String,

  email: {
    type: String,
    required: true
  },

  phone: String,

  message: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["unread", "read"],
    default: "unread"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export const ContactModel = mongoose.model("Contact", ContactSchema);





