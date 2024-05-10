import { Avatar, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, UpdateUser } from "../../Actions/User";
import { useAlert } from "../../AlertProvider";
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [avatar, setAvatar] = useState('');
  const [avatarPrev, setAvatarPrev] = useState(user && user.avatar ? user.avatar.url : '');

  const dispatch = useDispatch();
  const showAlert = useAlert()
  const navigate = useNavigate()


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler =  (e) => {
    e.preventDefault();
     dispatch(UpdateUser(name, email, avatar,showAlert));
      dispatch(loadUser());
      navigate('/account');
  };


  return (
    <>
      <div className="updateProfile">
        <form className="updateProfileForm" onSubmit={submitHandler}>
          <Typography variant="h4" style={{ padding: "2vmax" }}>
            Update Profile
          </Typography>

          <Avatar
            src={avatarPrev}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <input
            type="text"
            value={name}
            placeholder="Name"
            className="updateProfileInputs"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="updateProfileInputs"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">
            Update
          </Button>
        </form>
      </div>
      <footer><Typography variant='h6' >Developed by Jasvanth || copyright&copy; 2024 || All rights received.</Typography></footer>
    </>
  );
};

export default UpdateProfile;