import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import person from "../../assets/icons/profile.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { fetchLoginUser, logoutUser } from "../../redux/features/userSlice";
import { GiNightSky } from "react-icons/gi";
import { FiHeart } from "react-icons/fi";
import { PiBooksBold } from "react-icons/pi";
import { BsBasket2Fill } from "react-icons/bs";

import axios from 'axios';
// import { DayAndNightToggle } from 'react-day-and-night-toggle'
import { PiSunLight } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import api from "../../redux/features/api";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const basket = useSelector((state) => state.basket.basket);
  const { user, isLoggedIn, isAdmin, isLogin } = useSelector((state) => state.auth); 
  const count = basket.reduce((sum, i) => sum + i.count, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);



  useEffect(() => {
    dispatch(fetchLoginUser());
    // fetchTheme();
  }, [dispatch]);
  useEffect(() => {
    if (user?._id) {
      fetchTheme();
    }
  }, [user]); 
  
  console.log(user?._id)

  const fetchTheme = async () => {
    try {
   
      const response = await api.get(`http://localhost:5000/auth/theme/${user?._id}`);


      setDarkMode(response.data.theme === 'dark');
      document.body.classList.toggle('dark-mode', response.data.theme === 'dark');
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
  };
  const toggleMode = async () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');

    try {
      await api.put('http://localhost:5000/auth/theme', 
        { userId: user?._id, theme: newTheme }, 
        { withCredentials: true }
      );
      
      
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout", {}, { withCredentials: true });
  
      if (res.status === 200) {
        alert("Logout successful");
        dispatch(logoutUser());
        setDarkMode(false); 
        document.body.classList.remove("dark-mode"); 
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <>
      <section id="nav">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <Link to="/" className=".logo">
                Read <span className="logospan">Ly</span>
              </Link>
            </div>

            <div className={`nav-links nav-link-d ${isDropdownOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/all">All books</Link>
                </li>
                <li>
                  <Link to="/addtoread">Read later</Link>
                </li>
                {isAdmin && ( 
                  <li>
                    <Link to="/add">Admin Page</Link>
                  </li>
                )}
                <li>
                  <Link to="/readed">Readed</Link>
                  <sup style={{ color: "red" }}>{count}</sup>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                {/* <li>
                  <Link to="/">Contact Us</Link>
                </li> */}
              </ul>
            </div>

            <div className={`nav-links actions action-d`}>
              <ul>
                <li>
             




                    <div className={`toggle-container ${darkMode ? 'dark' : 'light'}`}>
                    <button onClick={toggleMode} className="switch-button">
                        {darkMode ? <GiNightSky className="icon night-icon" /> : <PiSunLight className="icon sun-icon" />}
                        <span className="mode-text">{darkMode ? 'Night' : 'Day'}</span>
                      </button>
                    </div>


                    {/* <img style={{ width: "20px", height: "25px" }} src={light} alt="Logo" /> */}
            

                </li>

                {/* <li>
                  <Link to="/">
                    <CiSearch size={25} />
                  </Link>
                </li> */}
                <li>
                  <Link to="/favorite">
                  <FiHeart />

                    {/* <img style={{ width: "20px", height: "20px" }} src={heart} alt="Logo" /> */}
                  </Link>
                </li>
                <li>
                  <Link to="/readlater">
                    {/* <img style={{ width: "20px", height: "20px" }} src={bookicon} alt="Logo" /> */}
                    <PiBooksBold />

                  </Link>
                </li>
                <li>
                  <Link to="/">
                    {/* <img style={{ width: "20px", height: "20px" }} src={basketicon} alt="basket" /> */}
                    <BsBasket2Fill />

                  </Link>
                  <sup style={{ color: "red" }}>{count}</sup>
                </li>
              </ul>
            </div>

            {!isLogin ? ( // Use isLogin here
              <div className="nav-links actions">
                <ul>
                  <li>
                    <Link to="/login">
                      <button className="whitebtn">Login</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <button className="mainbtn">Sign up</button>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="profile" onClick={toggleProfileDropdown}>
                <button className="profile-btn mx-1" style={{borderRadius:"50%"}}>
                <img style={{width:"30px",height:"30px",borderRadius:"50%"
                 }} src={user?.image ? `http://localhost:5000${user.image}` : person} alt="Profile" className="profile-photo" />
                </button>
                  Welcome {user?.name}
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown">
                    <ul>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li>
                        <button style={{ border: "none" }} onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="burger" onClick={toggleDropdown}>
              <RxHamburgerMenu color="black" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;

