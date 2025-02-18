import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchUsersort } from '../../redux/features/userSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // sweetalert2 import edilir
import { MdDelete } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';


const AdminUser = () => {
    const users = useSelector((state) => state.auth.users) || [];
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterAdmin, setFilterAdmin] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchUsersort({ sortOrder, isAdmin: filterAdmin, search: searchTerm }));
    }, [dispatch, sortOrder, filterAdmin, searchTerm]);

    const handleFilterChange = (e) => {
        setFilterAdmin(e.target.value);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatData = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const toggleAdmin = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/make-admin/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                dispatch(fetchUser());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${userId}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                dispatch(fetchUsersort({ sortOrder, isAdmin: filterAdmin, search: searchTerm }));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    };

    const toggleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const showUserInfo = (user) => {
        Swal.fire({
            title: `${user.username} - User Information`,
            html: `
                <div style="text-align: left;">
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Last Name:</strong> ${user.lastname}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Birth Date:</strong> ${formatData(user.birthDate)}</p>
                    <p><strong>Bio:</strong> ${user.bio || 'No bio available'}</p>
                    <p><strong>Is Verified:</strong> ${user.isVerified ? '✅ Yes' : '❌ No'}</p>
                    <p><strong>Is Admin:</strong> ${user.isAdmin ? '✅ Yes' : '❌ No'}</p>
                    <p><strong>Is Login:</strong> ${user.isLogin ? '✅ Yes' : '❌ No'}</p>
                    
                    <p><strong>Last Updated:</strong> ${formatDate(user.updatedAt)}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Close'
        });
    };

    return (
        <div className="container">
            <ToastContainer/>
            <h1>Admin Page - Users</h1>
            <Link className='mainbtn ' to='/add'>books</Link>
            <br />
            <div className="search-section my-3">
                <input
                    type="text"
                    id="search"
                    placeholder="Enter name, username, or lastname"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <button className="btn mainbtn my-3" onClick={toggleSort}>
                Sort: {sortOrder === "asc" ? "A-Z 🔼" : "Z-A 🔽"}
            </button>

            <div className="filter-section my-3">
                <select id="filterAdmin" value={filterAdmin} onChange={handleFilterChange}>
                    <option value="all">All Users</option>
                    <option value="true">Admins Only</option>
                    <option value="false">Non-Admins</option>
                </select>
            </div>
            <div className="table p-4">
                <div className="table-header">
                    <div className="header__item">Username</div>
                    <div className="header__item">Name</div>
                    <div className="header__item">Last Name</div>
                    <div className="header__item">Image</div>
                    <div className="header__item">Email</div>
                    <div className="header__item">Date</div>
                    <div className="header__item">Bio</div>
                    <div className="header__item">isVerified</div>
                    <div className="header__item">isAdmin</div>
                    <div className="header__item">isLogin</div>
                    <div className="header__item">updatedAt</div>
                    <div className="header__item">Make Admin</div>
                    <div className="header__item">Action</div>
                </div>
                <div className="table-content">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div className="table-row" key={user._id}>
                                <div className="table-data">{user.username}</div>
                                <div className="table-data">{user.name}</div>
                                <div className="table-data">{user.lastname}</div>
                                <div className="table-data" style={{ height: "70px" }}>
                                    <img src={user.image ? `http://localhost:5000${user.image}` : "https://picsum.photos/200"} alt="user" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                </div>
                                <div className="table-data">{user.email}</div>
                                <span className="table-data">{formatData(user.birthDate)}</span>
                                <div className="table-data">{user.bio ? user.bio : 'No thing'}</div>
                                <div className="table-data">{user.isVerified ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{user.isAdmin ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{user.isLogin ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{formatDate(user.updatedAt)}</div>
                                <div className="table-data">
                                    <button style={{ margin: "0px", padding: "0px" }}
                                        className={`btn ${user.isAdmin ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => toggleAdmin(user._id)}
                                    >
                                        {user.isAdmin ? "Remove admin " : "Make admin"}
                                    </button>
                                </div>
                                <div className="table-data">
                                    <button

                                        style={{ color:"red" }}
                                        className="btn"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                   <MdOutlineDelete />


                                    </button>
                                    <button style={{color:"orange"}} className='btn' onClick={() => showUserInfo(user)}><LuInfo />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUser;