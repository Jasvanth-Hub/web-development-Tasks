import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginError", (state,action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success
      state.isAuthenticated = false;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.success = action.payload.success
      state.user = action.payload.user
      state.message = action.payload.message
      state.isAuthenticated = true;
      state.error = null
    })
    .addCase("LoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; 
      state.message = null
      state.success = action.payload.success
      state.isAuthenticated = false;
    })


    .addCase("RegisterRequest", (state) => {
      state.loading = true;
      state.error = null; 
    })
    .addCase("RegisterError", (state,action) => {
      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message;
      state.isAuthenticated = false;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success
      state.message = action.payload.message;
      state.error = null; 
      state.isAuthenticated = true;
    })
    .addCase("RegisterFailure", (state, action) => {
      state.loading = false;
      state.message = null
      state.success = action.payload.success
      state.error = action.payload;
      state.isAuthenticated = false;
    })


    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserError", (state,action) => {
      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message;
      state.isAuthenticated = false;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success
      state.isAuthenticated = true;
    })
    .addCase("LoadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null
      state.success = action.payload.success
      state.isAuthenticated = false;
    })


    .addCase("LogoutUserRequest", (state) => {
      state.loading = true;
      state.error = null; 
    })
    .addCase("LogoutUserSuccess", (state,action) => {
      state.loading = false;
      state.error = null
      state.user = null
      state.success = action.payload.success
      state.message = action.payload.message;
      state.isAuthenticated = false;
    })
    .addCase("LogoutUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
      state.message = null
      state.success = action.payload.success
    })


    
    .addCase("UpdateUserRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("UpdateUserSuccess", (state,action) => {
      state.loading = false;
      state.message = action.payload.message
      state.error = null; 
      state.isAuthenticated = true;
      state.success = action.payload.success
    })
    .addCase("UpdateUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
      state.message = null
      state.success = action.payload.success
    })


    .addCase("UpdatePasswordRequest", (state) => {
      state.loading = true;
      state.error = null; 
    })
    .addCase("UpdatePasswordError", (state,action) => {
      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message;
      state.isAuthenticated = true;
    })
    .addCase("UpdatePasswordSuccess", (state,action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null; 
      state.isAuthenticated = true;
      state.success = action.payload.success
    })
    .addCase("UpdatePasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
      state.message = null
      state.isAuthenticated = true;
      state.success = action.payload.success
    })


    .addCase("DeleteProfileRequest", (state) => {
      state.loading = true;
      state.error = null; 
    })
    .addCase("DeleteProfileSuccess", (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload.message;
      state.error = null; 
      state.isAuthenticated = false;
      state.success = action.payload.success
    })
    .addCase("DeleteProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null
      state.isAuthenticated = false;
      state.success = action.payload.success
    });
});
