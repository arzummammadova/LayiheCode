import React, { useEffect, useState } from 'react';
import './UserSettings.scss';
import profileImg from '../../assets/images/settingphoto.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUser } from '../../redux/features/userSlice';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
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
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:editSchema
    ,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
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

      toast.success('Profile updated successfully!');
      await dispatch(fetchLoginUser());
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error updating profile');
      console.error(error);
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/auth/deleteprofileimage/${user._id}`
      );

      if (response.status === 200) {
        toast.success('Profile image deleted successfully!');
        await dispatch(fetchLoginUser());
      }
    } catch (error) {
      toast.error('Error deleting profile image');
      console.error(error);
    }
  };

  // Calculate user age
  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; 
  };

  return (
    <div className="container">
      <div className="user-settings">
        <div className="profile-card">
          <div className="row profileg">
            <div className="profile-image col-lg-5">
              <ToastContainer/>
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
                <p>Age: {calculateAge(user.birthDate)}</p>
                <p>Birth Date: {user.birthDate ? formatDate(user.birthDate) : 'Not provided'}</p>
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

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                placeholder="Username"
              />

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                placeholder="Email"
              />

              <input
                type="date"
                name="birthDate"
                value={profile.birthDate}
                onChange={handleChange}
              />

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Bio"
              ></textarea>

              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;