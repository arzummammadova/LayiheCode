import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logochat from '../../assets/images/ReadlyChat.svg';
import desing from '../../assets/images/Untitled design (1).png';
import { IoCloseSharp, IoExpandOutline } from 'react-icons/io5';
import { BsChatLeftHeartFill, BsSend } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { FaAngleDown } from 'react-icons/fa'; 
import './chat.scss';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAllResults, setShowAllResults] = useState(false); 
    const chatContentRef = useRef(null);

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const searchFromMultipleSources = async (query) => {
        const results = [];

        try {
            const googleBooksResponse = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
            );

            if (googleBooksResponse.data.items) {
                googleBooksResponse.data.items.forEach((item) => {
                    const bookInfo = item.volumeInfo;
                    results.push({
                        title: bookInfo.title || "Başlıq mövcud deyil",
                        description: bookInfo.description && bookInfo.description.trim() !== "" 
                            ? bookInfo.description 
                            : "Bu kitab üçün təsvir mövcud deyil.",
                        link: bookInfo.infoLink || "#",
                        image: bookInfo.imageLinks?.thumbnail || "https://placehold.co/400", 
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
                        title: doc.title || "Başlıq mövcud deyil",
                        description: doc.subtitle && doc.subtitle.trim() !== "" 
                            ? doc.subtitle 
                            : "Bu kitab üçün təsvir mövcud deyil.",
                        link: `https://openlibrary.org${doc.key}` || "#",
                        image: doc.cover_i 
                            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                            : "https://placehold.co/400", 
                        source: "Open Library"
                    });
                });
            }
        } catch (error) {
            console.error('Open Library API-dən məlumat alınarkən xəta baş verdi:', error);
        }

        return results;
    };

    const handleSend = async () => {
        if (message.trim() !== '') {
            const userMessage = { text: message, from: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setMessage('');
            setIsLoading(true);
    
            try {
                if (isSearching) {
                    
                    const searchMessage = { 
                        text: `Siz"${message}" haqqında axtarış edirsiniz...`, 
                        from: 'bot' 
                    };
                    setMessages((prevMessages) => [...prevMessages, searchMessage]);
    
                   
                    const results = await searchFromMultipleSources(message);
    
                 
                    const botMessage = { 
                        text: `Budur !Axtarış nəticələri: ${results.length} nəticə tapıldı.`, 
                        from: 'bot',
                        type: 'search-results', 
                        results: results 
                    };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    const endpoint = 'http://localhost:5000/chat';
                    const response = await axios.post(endpoint, { message });
                    const botMessage = { text: response.data.message, from: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                }
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Xəta baş verdi. 😕', from: 'bot' }
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSearchToggle = () => {
        setIsSearching(!isSearching);
    };

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <div className="readlychat" onClick={toggleChat}>
                <BsChatLeftHeartFill size={25} />
            </div>
            <div className={`chat-modal ${isOpen ? 'open' : ''} ${isFullscreen ? 'fullscreen' : ''}`}>
                <div className="chat-header">
                    <img src={desing} alt="" style={{ width: "30px", height: "30px" }} />
                    <img src={logochat} alt="" style={{ width: "130px", height: "20px" }} />

                    <div className="header-icons">
                        <button className="fullscreen-btn" onClick={toggleFullscreen}>
                            <IoExpandOutline />
                        </button>
                        <button className="close-btn" onClick={toggleChat}>
                            <IoCloseSharp />
                        </button>
                    </div>
                </div>

                <div className="chat-content" ref={chatContentRef}>
                    <div className="firstcontent">
                        <div className="welcome-header">👋 Salam! Mən ReadlyChat sənin kitab köməkçin!</div>
                        <p className="welcome-text">Burada istədiyin kitab haqqında sual verə bilərsən. 😊</p>
                        <div className="suggestions">
                            ✨ <strong>Məsələn:</strong>
                            <ul>
                                <li>🔥 <span>Bestsellerlər</span> haqqında soruş</li>
                                <li>🧙‍♂️ <span>Fantastik kitablar</span> ilə maraqlan</li>
                                <li>🖋️ <span>Məşhur yazıçılar</span> barədə öyrən</li>
                            </ul>
                        </div>
                        <p className="final-note">
                            Mən sənin kitab dünyanda ən yaxşı yoldaşın olmağa hazıram! Elə isə aşağıda suallarını yaz🚀
                        </p>
                    </div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            {msg.type === 'search-results' ? ( 
                                <div className="search-results">
                                    <h5>Axtarış Nəticələri:</h5>
                                    <div className="results-grid">
                                        {msg.results.slice(0, showAllResults ? msg.results.length : 2).map((result, idx) => (
                                            <div key={idx} className="result-card">
                                                <img src={result.image} alt={result.title} className="result-image" />
                                                <div className="result-details">
                                                    <h4>{result.title}</h4>
                                                    <p>{result.description.slice(0, 50)}...</p>
                                                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                                                        Ətraflı məlumat
                                                    </a>
                                                    <p><small>Mənbə: {result.source}</small></p>
                                                </div>
                                            </div>
                                        ))}
                                        {msg.results.length > 2 && (
                                            <div className="show-more" onClick={() => setShowAllResults(!showAllResults)}>
                                                <FaAngleDown size={20} />
                                                <span>{showAllResults ? 'Daha az göstər' : 'Daha çox göstər'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={msg.from === 'user' ? 'user-message' : 'bot-message'}>
                                    {msg.text}
                                </p>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <p className="bot-message">
                            <span className="loading-text">ReadlyChat düşünür...</span>
                        </p>
                    )}
                </div>

                <div className="chat-input-container">
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Mesajınızı yazın..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-btn" onClick={handleSend}>
                            <BsSend />
                        </button>
                    </div>
                    <div
                        className={`search-toggle ${isSearching ? 'active' : ''}`}
                        onClick={handleSearchToggle}
                    >
                        <TbWorldWww size={25} />
                        <span className="search-tooltip">Search web when necessary</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;