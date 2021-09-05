import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: localStorage.getItem("isLogedIn"),
  userMail: localStorage.getItem("email"),
  type: localStorage.getItem("type"),
  userID: localStorage.getItem("userID"),
  userName: localStorage.getItem("userName"),
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
      state.userName = action.payload.name;
      localStorage.setItem("email", state.userMail);
      localStorage.setItem("type", state.type);
      localStorage.setItem("userID", state.userID);
      localStorage.setItem("isLogedIn", state.isLogedIn);
      localStorage.setItem("userName", state.userName);
    },
    logout(state) {
      state.isLogedIn = false;
      state.userMail = null;
      state.type = null;
      localStorage.removeItem("email");
      localStorage.removeItem("type");
      localStorage.removeItem("userID");
      localStorage.removeItem("isLogedIn");
      localStorage.removeItem("userName");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
