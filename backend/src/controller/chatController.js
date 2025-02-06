import mongoose from 'mongoose';
import levenshtein from 'levenshtein';
import Chat from '../models/chatModel.js';
import Fuse from 'fuse.js';


export const chat = async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    try {
        const chatData = await Chat.find({});

        if (!chatData || chatData.length === 0) {
            return res.status(200).json({ message: "Üzr istəyirəm, cavab tapılmadı." });
        }

        let closestMatch = { response: 'Bağışlayın, sualınızı başa düşmədim.' };
        let minDistance = Infinity;

        for (let i = 0; i < chatData.length; i++) {
            const distance = new levenshtein(userMessage, chatData[i].trigger.toLowerCase());

            if (distance < minDistance) {
                minDistance = distance;
                closestMatch = chatData[i];
            }
        }

        const options = {
            includeScore: true,
            keys: ['trigger']
        };

        const fuse = new Fuse(chatData, options);
        const fuzzyResult = fuse.search(userMessage);

        if (fuzzyResult.length > 0) {
            closestMatch = fuzzyResult[0].item;
        }

        res.status(200).json({ message: closestMatch.response });
    } catch (error) {
        console.error('Xəta baş verdi:', error);
        res.status(500).json({ error: 'Xəta baş verdi!' });
    }
};





export const addChat = async (req, res) => {
    const { trigger, response } = req.body;

    if (!trigger || !response) {
        return res.status(400).json({ error: 'Trigger və cavab sahələri tələb olunur.' });
    }

    try {
        const newChat = new Chat({
            trigger: trigger.toLowerCase(),
            response: response
        });

        await newChat.save(); 
        res.status(201).json({ message: 'Yeni cümlə əlavə edildi.' });
    } catch (error) {
        console.error('Xəta baş verdi:', error);
        res.status(500).json({ error: 'Xəta baş verdi!' });
    }
}; 


export const addMany= async (req, res) => {
    try {
        const chats = req.body; 
        await Chat.insertMany(chats);
        res.status(200).json({ message: 'Cümlələr MongoDB-ə əlavə edildi.' });
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi.', error: error.message });
    }
};