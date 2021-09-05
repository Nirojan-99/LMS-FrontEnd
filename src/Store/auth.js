import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: localStorage.getItem("isLogedIn"),
  userMail: localStorage.getItem("email"),
  type: localStorage.getItem("type"),
  userID: localStorage.getItem("userID"),
};

const authStore = createSlice({
  name: "loging",
  initialState: initial,
  reducers: {
    login(state, action) {
      state.isLogedIn = true;
      state.userMail = action.payload.email;
      state.type = action.payload.type;
      state.userID = action.payload.id;
      localStorage.setItem("email", state.userMail);
      localStorage.setItem("type", state.type);
      localStorage.setItem("userID", state.userID);
      localStorage.setItem("isLogedIn", state.isLogedIn);
    },
    logout(state) {
      state.isLogedIn = false;
      state.userMail = null;
      state.type = null;
      localStorage.removeItem("email");
      localStorage.removeItem("type");
      localStorage.removeItem("userID");
      localStorage.removeItem("isLogedIn");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
