import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logochat from '../../assets/images/ReadlyChat.svg';
import desing from '../../assets/images/Untitled design (1).png';
import { IoCloseSharp, IoExpandOutline } from 'react-icons/io5';
import { BsChatLeftHeartFill, BsSend } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import './chat.scss';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSearching, setIsSearching] = useState(false); 
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

    const handleSend = async () => {
        if (message.trim() !== '') {
            const userMessage = { text: message, from: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            try {
                const endpoint = isSearching ? 'http://localhost:5000/chat/search' : 'http://localhost:5000/chat';
                const response = await axios.post(endpoint, { message });
                const botMessage = { text: response.data.message, from: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Xəta baş verdi. 😕', from: 'bot' }
                ]);
            }

            setMessage('');
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
                        <p key={index} className={msg.from === 'user' ? 'user-message' : 'bot-message'}>
                            {msg.text}
                        </p>
                    ))}
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