
import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({

    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

  imageUrl: [String],

  finalDecision: {
    type: String,
    enum: ["healthy", "disease","not_lettuce"]
  },

  averageConfidence: Number,

  total_images:Number,

 results: [
    {
      image_index: Number,
      prediction: String,
      confidence: Number,
      disease_name:String,
      description:String,
      treatment:[String],
      status: String,
      message: String

    }
  ],

  
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export const PredictionModel = mongoose.model("Prediction", PredictionSchema);

