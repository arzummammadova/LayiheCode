import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import heart from "../../assets/icons/heart.svg";
import { CiSearch } from "react-icons/ci";
import light from "../../assets/icons/light.svg";
import bookicon from "../../assets/icons/bookicon.svg";
import basketicon from "../../assets/icons/basket.svg";
import person from "../../assets/icons/profile.svg";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const basket = useSelector((state) => state.basket.basket);
  const user=useSelector((state)=>state.auth.auth);
  const count = basket.reduce((sum, i) => sum + i.count, 0);
  console.log(user)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
                  <Link to="/">All books</Link>
                </li>
                <li>
                  <Link to="/add">My books</Link>
                </li>
                <li>
                  <Link to="/add">Add Page</Link>
                </li>
                <li>
                  <Link to="/basket">Basket</Link>
                  <sup style={{ color: "red" }}>{count}</sup>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className={`nav-links actions action-d`}>
              <ul>
                <li>
                  <Link to="/">
                    <img style={{ width: "20px", height: "25px" }} src={light} alt="Logo" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <CiSearch size={25} />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img style={{ width: "20px", height: "20px" }} src={heart} alt="Logo" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img style={{ width: "20px", height: "20px" }} src={bookicon} alt="Logo" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img style={{ width: "20px", height: "20px" }} src={basketicon} alt="basket" />
                  </Link>
                  <sup style={{ color: "red" }}>{count}</sup>
                </li>
              </ul>
            </div>

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

         <div className="profile">
              <Link to="/profile">
                <img
                  src={user?.image || person}
                  alt="profile"
                  className="profile-img"
                />

              </Link>
              {/* <p>Welcome ,{user.firstName}</p> */}
         </div>


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
