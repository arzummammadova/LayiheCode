import React, { useEffect, useRef } from 'react'
import './hero.scss'
import heroright from "../../assets/images/heroright.png"
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsChatLeftHeartFill } from "react-icons/bs";
import { useState } from 'react';
import axios from 'axios';
import logochat from '../../assets/images/ReadlyChat.svg'
import desing from '../../assets/images/Untitled design (1).png'
import { IoCloseSharp, IoExpandOutline } from 'react-icons/io5';

import right from "../../assets/icons/image9.svg"
import Chat from '../chat/Chat';
const Hero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatContentRef = useRef(null);
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleSend = async () => {
        if (message.trim() !== '') {
            const userMessage = { text: message, from: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            try {
                const response = await axios.post('http://localhost:5000/chat', { message });
                const botMessage = { text: response.data.message, from: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Bağlantı xətası baş verdi. 😕', from: 'bot' }
                ]);
            }

            setMessage(''); 
        }
    };
    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <>


            <section id='hero'>
                <div className="container">
                    <div className="h">
                    <div className="hero">
                        <div className="row ">
                            <div className="col-lg-6  left">
                                <p className='header'>
                                    Your Journey to a World of Stories Starts Here.</p>
                                {/* <h1 className='headermain'>Furniture Collections</h1> */}
                                <p className='mt-3'>Browse our vast collection of books, explore new releases, and get your hands on the latest bestsellers. Your next adventure is just a click away!</p>
                                <button  className='btnsh btnflex discover-btn ' >
                                    <Link to='/all' >Discover</Link></button>
                              
                            </div>

                            <div className="col-lg-6 right right-hero">
                                <Link to='/all' className='popular-p'>watch today’s <span className='green'> popular
                                </span> book
                                    <FaRegArrowAltCircleRight />

                                </Link>
                                <figure>
                                    <img src={heroright} alt="auter" />


                                    {/* <div className="readlychat" onClick={toggleChat}>
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
                                                <div className="welcome-header">
                                                    👋 Salam! Mən ReadlyChat sənin kitab köməkçin!
                                                </div>

                                                <p className="welcome-text">
                                                    Burada istədiyin kitab haqqında sual verə bilərsən. 😊
                                                </p>

                                                <div className="suggestions">
                                                    ✨ <strong>Məsələn:</strong>
                                                    <ul>
                                                        <li>🔥 <span>Bestsellerlər</span> haqqında soruş</li>
                                                        <li>🧙‍♂️ <span>Fantastik kitablar</span> ilə maraqlan</li>
                                                        <li>🖋️ <span>Məşhur yazıçılar</span> barədə öyrən</li>
                                                    </ul>
                                                </div>

                                                <p className="final-note">
                                                    Mən sənin kitab dünyanda ən yaxşı yoldaşın olmağa hazıram!
                                                    elə isə aşağıda suallarını yaz🚀
                                                </p>
                                            </div>
                                            {messages.map((msg, index) => (
                                                <p key={index} className={msg.from === 'user' ? 'user-message' : 'bot-message'}>
                                                    {msg.text}
                                                </p>
                                            ))}
                                        </div>


                                        <div className="chat-input">
                                            <input
                                                type="text"
                                                placeholder="Mesajınızı yazın..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            />
                                          
                                            <button onClick={handleSend}>Göndər</button>
                                        
                                        </div>
                                    </div> */}
                                </figure>
                              




                            </div>
                        </div>
                        <Chat/>
                    </div>
                
                </div>    
                </div>
            
            
            </section>

        </>
    )
}

export default Hero
