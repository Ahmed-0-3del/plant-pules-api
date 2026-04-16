
import express from 'express'
import upload from '../../../middleware/upload.js';
import {  getRecentScans, getStats, scanPlant } from '../controllers/scan.controller.js';
import { protectRoutes } from '../../auth/controllers/auth.controller.js';

const scanRoutes = express.Router();

scanRoutes.post("/predict",protectRoutes,upload.array("images",10),scanPlant)
scanRoutes.get("/stats", protectRoutes, getStats);
scanRoutes.get("/recent", protectRoutes, getRecentScans);

export default scanRoutes;

