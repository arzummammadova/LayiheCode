import React, { useEffect, useState } from 'react';
import './UserSettings.scss';
import profileImg from '../../assets/images/settingphoto.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUser } from '../../redux/features/userSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { editSchema } from '../../schema/EditSchema';

const UserSettings = () => {
  const user = useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name || '',
    lastname: user.lastname || '',
    username: user.username || '',
    email: user.email || '',
    bio: user.bio || '',
    birthDate: user.birthDate || '',
    image: null
  });

  useEffect(() => {
    setProfile({
      name: user.name || '',
      lastname: user.lastname || '',
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      birthDate: user.birthDate || '',
      image: null
    });
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: files[0]
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('lastname', profile.lastname);
      formData.append('username', profile.username);
      formData.append('bio', profile.bio);
      formData.append('birthDate', profile.birthDate);
      if (profile.image) {
        formData.append('image', profile.image);
      }

      await axios.put(
        `http://localhost:5000/auth/editprofile/${user._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      Swal.fire('Success', 'Profile updated successfully!', 'success');
      await dispatch(fetchLoginUser());
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire('Error', 'Error updating profile', 'error');
      console.error(error);
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/auth/deleteprofileimage/${user._id}`
      );

      if (response.status === 200) {
        Swal.fire('Success', 'Profile image deleted successfully!', 'success');
        await dispatch(fetchLoginUser());
      }
    } catch (error) {
      Swal.fire('Error', 'Error deleting profile image', 'error');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="user-settings">
        <div className="profile-card">
          <div className="row profileg">
            <div className="profile-image col-lg-5">
              <img
                src={user.image ? `http://localhost:5000${user.image}` : profileImg}
                alt="Profile"
                className="profile-photo"
              />
              {user.image && (
                <button className="btn btn-danger mt-4" onClick={handleDeleteProfileImage}>
                  Delete Profile Image
                </button>
              )}
            </div>
            <div className="profile-info col-lg-7">
              <div className="container">
                <h2>Welcome {user.username}</h2>
                <p>Name: {user.name}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Email: {user.email}</p>
                <p>Birth Date: {user.birthDate || 'Not provided'}</p>
                <div className="bios mt-3">
                  Your Bio: <span className="bio">{user.bio || 'No bio provided.'}</span>
                </div>
                <button className="edit-profile-btn mt-4" onClick={toggleModal}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Profile</h3>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
              <input type="text" name="lastname" value={profile.lastname} onChange={handleChange} placeholder="Last Name" />
              <input type="text" name="username" value={profile.username} onChange={handleChange} placeholder="Username" />
              <input type="email" name="email" value={profile.email} disabled placeholder="Email" />
              <input type="date" name="birthDate" value={profile.birthDate} onChange={handleChange} />
              <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio"></textarea>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
