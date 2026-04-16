


import express from 'express'
import { getAllMessages, getSingleMessage, replyToMessage, sendMessage } from '../controller/contact.controller.js';
import { protectRoutes } from '../../auth/controllers/auth.controller.js';
import { allowTo } from '../../../middleware/authorization.js';

const contactRoutes = express.Router();

contactRoutes.post("/message",protectRoutes,sendMessage);

contactRoutes.get("/message",protectRoutes,allowTo("admin"),getAllMessages);

contactRoutes.get("/message/:id",protectRoutes,allowTo("admin"),getSingleMessage);

contactRoutes.post("/message/reply/:id",protectRoutes, allowTo("admin"),replyToMessage);

export default contactRoutes;



