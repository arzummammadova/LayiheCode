import mongoose from 'mongoose';
import levenshtein from 'levenshtein';
import Chat from '../models/chatModel.js';
import Fuse from 'fuse.js';
import axios from 'axios';


const findClosestMatch = (userMessage, chatData) => {
    let closestMatch = { response: 'Bağışlayın, sualınızı başa düşmədim.' };
    let minDistance = Infinity;

    for (let i = 0; i < chatData.length; i++) {
        const distance = new levenshtein(userMessage, chatData[i].trigger.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = chatData[i];
        }
    }

    return closestMatch;
};

const performFuzzySearch = (userMessage, chatData) => {
    const options = {
        includeScore: true,
        keys: ['trigger']
    };
    const fuse = new Fuse(chatData, options);
    const fuzzyResult = fuse.search(userMessage);
    return fuzzyResult.length > 0 ? fuzzyResult[0].item : null;
};

const searchWikipedia = async (query) => {
    try {
        const response = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json`
        );
        const [searchTerm, titles, descriptions, links] = response.data;

        if (titles.length > 0) {
            return {
                title: titles[0],
                description: descriptions[0] || "Təsvir mövcud deyil.",
                link: links[0],
                source: "Wikipedia"
            };
        }
    } catch (error) {
        console.error('Wikipedia API-dən məlumat alınarkən xəta baş verdi:', error);
    }
    return null;
};

const searchFromMultipleSources = async (query) => {
    const results = [];

    const wikipediaResult = await searchWikipedia(query);
    if (wikipediaResult) {
        results.push(wikipediaResult);
    }

    try {
        const googleBooksResponse = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
        );

        if (googleBooksResponse.data.items) {
            googleBooksResponse.data.items.forEach((item) => {
                const bookInfo = item.volumeInfo;
                results.push({
                    title: bookInfo.title,
                    description: bookInfo.description || "Təsvir mövcud deyil.",
                    link: bookInfo.infoLink,
                    source: "Google Books"
                });
            });
        }
    } catch (error) {
        console.error('Google Books API-dən məlumat alınarkən xəta baş verdi:', error);
    }

    try {
        const openLibraryResponse = await axios.get(
            `https://openlibrary.org/search.json?q=${query}&limit=5`
        );

        if (openLibraryResponse.data.docs) {
            openLibraryResponse.data.docs.forEach((doc) => {
                results.push({
                    title: doc.title,
                    description: doc.subtitle || "Təsvir mövcud deyil.",
                    link: `https://openlibrary.org${doc.key}`,
                    source: "Open Library"
                });
            });
        }
    } catch (error) {
        console.error('Open Library API-dən məlumat alınarkən xəta baş verdi:', error);
    }

    return results;
};

export const chat = async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    try {
        const chatData = await Chat.find({});

        if (!chatData || chatData.length === 0) {
            return res.status(404).json({ message: "Üzr istəyirəm, cavab tapılmadı." });
        }

        let closestMatch = findClosestMatch(userMessage, chatData);

        const fuzzyMatch = performFuzzySearch(userMessage, chatData);
        if (fuzzyMatch) {
            closestMatch = fuzzyMatch;
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

export const addMany = async (req, res) => {
    try {
        const chats = req.body;
        await Chat.insertMany(chats);
        res.status(200).json({ message: 'Cümlələr MongoDB-ə əlavə edildi.' });
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi.', error: error.message });
    }
};

export const chatsearch = async (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    try {
        const searchQuery = encodeURIComponent(userMessage);
        const searchResults = await searchFromMultipleSources(searchQuery);

        if (searchResults.length === 0) {
            return res.status(404).json({ message: "Üzr istəyirəm, bu mövzuda məlumat tapılmadı." });
        }

        const firstResult = searchResults[0];
        const responseMessage = `Mənə elə gəlir ki, siz "${firstResult.title}" haqqında soruşursunuz. ${firstResult.description} Daha ətraflı məlumat üçün buraya baxın: ${firstResult.link}`;

        res.status(200).json({ message: responseMessage });
    } catch (error) {
        console.error('Axtarış zamanı xəta baş verdi:', error);
        res.status(500).json({ error: 'Xəta baş verdi!' });
    }
};