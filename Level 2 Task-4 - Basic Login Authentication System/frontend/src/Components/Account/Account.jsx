import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, logoutUser } from "../../Actions/User";
import "./Account.css";
import { useAlert } from "../../AlertProvider";

const Account = () => {



  const dispatch = useDispatch();
  const showAlert = useAlert()

  const { user } = useSelector((state) => state.user);

  const logoutHandler =  () => {
    dispatch(logoutUser(showAlert));
  };

  const deleteProfileHandler = () => {
    const ok = window.confirm("Are you sure want to delete your Profile.")
    if(ok)
    {
      dispatch(deleteMyProfile(showAlert));
    }
  };


  return (
    <>
    
    <div className="account">
      <div className="accountleft">
          <Typography className="hi" variant="h3">Hi {user.name},</Typography>
          <Typography variant="h4">Hope you are doing well ..🙂</Typography>
      </div>
      <div className="accountright">
        <Typography variant="h3"> My profile </Typography>
        <Avatar
          src={user.avatar? user.avatar.url : ""}
          sx={{ height: "8vmax", width: "8vmax" }}
          />

        <Typography className="detail" variant="h4">{user.name}</Typography>


        <Typography className="detail"  variant="h6">Email : {user.email}</Typography>


        <Link to="/update/profile">Edit Profile</Link>

        <Link to="/update/password">Change Password</Link>


        <Link to="/" ><Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>  </Link>

        <Link to="/"  ><Button
          variant="text"
          style={{ color: "red" }}
          onClick={deleteProfileHandler}
          >
          Delete My Profile
        </Button></Link>

      </div>
    </div>
    <footer><Typography variant='h6' >Developed by Jasvanth || copyright&copy; 2024 || All rights received.</Typography></footer>
     </>
  );
};

export default Account;