import express from 'express';
import { createMessage, getMyMessages } from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const messageRouter = express.Router();

messageRouter.post('/send-message', verifyToken, createMessage);
messageRouter.get('/my-messages', verifyToken, getMyMessages);

export default messageRouter;
