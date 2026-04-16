
import { PredictionModel } from '../../../../DB/models/Prediction.js';
import cloudinary from '../../../config/cloudinary.js'
import { handleError } from '../../../middleware/handelErorr.js';
import { AppError } from '../../../utils/AppErorr.js';
import axios from "axios";
import fs from "fs";
import FormData from "form-data";









export const scanPlant = handleError(
  async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
      return next(new AppError("Please upload images", 400));
    }

    //  1. ابعت الصور للـ AI
    const formData = new FormData();

    req.files.forEach(file => {
      formData.append("images", fs.createReadStream(file.path));
    });

    const aiResponse = await axios.post(
      "https://plant-pules-model-api--ahmed123info200.replit.app/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    const {
      final_decision,
      average_confidence,
      total_images,
      results
    } = aiResponse.data;

    //   ارفع الصور Cloudinary
    let imageUrls = [];

    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "plants"
      });

      imageUrls.push(uploadResult.secure_url);

      fs.unlinkSync(file.path);
    }

    //  خزّن في DB
    const prediction = await PredictionModel.create({
      userId: req.user._id,
      imageUrl: imageUrls,
      finalDecision: final_decision,
      averageConfidence: average_confidence,
      total_images:total_images,
      results: results
    });

    //  4. رجّع response
    res.status(201).json({
      status: "success",
      message: "Scan completed",
      data: prediction
    });
  }
);






export const getStats = handleError(
  async (req, res, next) => {

    const userId = req.user._id;

    //  Total
    const total = await PredictionModel.countDocuments({ userId });

    //  Healthy
    const healthy = await PredictionModel.countDocuments({
      userId,
      finalDecision: "healthy"
    });

    //  Diseased
    const diseased = await PredictionModel.countDocuments({
      userId,
      finalDecision: "diseased"
    });

    res.json({
      status: "success",
      data: {
        totalScans: total,
        healthy,
        diseased
      }
    });
  }
);


export const getRecentScans = handleError(
  async (req, res, next) => {

    const scans = await PredictionModel.find({ userId: req.user._id })
      .sort({ createdAt: -1 })   //  الأحدث الأول
      .limit(5);                 //  آخر 5 بس

    res.json({
      status: "success",
      results: scans.length,
      data: scans
    });
  }
);




