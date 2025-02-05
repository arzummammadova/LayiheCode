import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';
import { Link } from 'react-router-dom';
const AdminUser = () => {
    const users = useSelector((state) => state.auth.users)||[];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    console.log(users);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // const removeUser = (userId) => {
    //     console.log("Deleting user with ID:", userId);
    //     // Burada user silmək üçün action çağırılmalıdır
    // };

    return (
        <div className="container">
            <h1>Admin Page - Users</h1>
            <Link className='mainbtn ' to='/add'>books</Link>
            <div className="table p-4">
                <div className="table-header">
                    <div className="header__item">Username</div>
                    <div className="header__item">Name</div>
                    <div className="header__item">Last Name</div>
                    <div className="header__item">Image</div>
                    <div className="header__item">Email</div>
                    <div className="header__item">isVerified
                    </div>
                    <div className="header__item">
                        isAdmin
                    </div>
                    <div className="header__item">
                        isLogin
                    </div>
                    <div className="header__item">updatedAt
                    </div>

                    {/* <div className="header__item">Action</div> */}
                </div>
                <div className="table-content">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div className="table-row" key={user._id}>
                                <div className="table-data">{user.username}</div>
                                <div className="table-data">{user.name}</div>
                                <div className="table-data">{user.lastname}</div>

                                <div className="table-data" style={{ height: "70px" }}>
                                    <img src={user.image ? user.image : "https://picsum.photos/200"} alt="user" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                </div>
                                <div className="table-data">{user.email}</div>
                                <div className="table-data">{user.isVerified ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{user.isAdmin ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{user.isLogin ? '✅ Yes' : '❌ No'}</div>
                                <div className="table-data">{formatDate(user.updatedAt)}</div>
                             
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
