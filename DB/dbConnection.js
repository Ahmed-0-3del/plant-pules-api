


import mongoose from "mongoose";

let isConnected = false;

export const connDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;

    console.log("DB connected successfully ");
  } catch (error) {
    console.error("DB connection failed :", error.message);
    throw error;
  }
};










// import mongoose from "mongoose";

// const urlDB = "mongodb+srv://a6679722_db_user:Ahmed72004@cluster0.a1j9naq.mongodb.net/Plant_pules?retryWrites=true&w=majority";

// export const connDB = async () => {
//   console.log(" Trying to connect DB...");
//   try {
//     await mongoose.connect(urlDB);
//     console.log(" DB connected successfully");
//   } catch (error) {
//     console.error(" DB connection failed:", error.message);
//   }
// };
