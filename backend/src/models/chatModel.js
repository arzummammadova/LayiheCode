import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    trigger: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
