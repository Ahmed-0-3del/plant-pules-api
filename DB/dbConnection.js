


import mongoose from "mongoose";

const urlDB = "mongodb+srv://a6679722_db_user:Ahmed72004@cluster0.a1j9naq.mongodb.net/Plant_pules?retryWrites=true&w=majority";

export const connDB = async () => {
  console.log(" Trying to connect DB...");
  try {
    await mongoose.connect(urlDB);
    console.log(" DB connected successfully");
  } catch (error) {
    console.error(" DB connection failed:", error.message);
  }
};
