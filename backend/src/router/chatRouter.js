import express from 'express';
import { addChat, addMany, chat } from '../controller/chatController.js';
// import { addChatSentence, chat } from '../controller/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/', chat);
chatRouter.post('/add', addChat); 
chatRouter.post('/addmany', addMany)

export default chatRouter;