import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: localStorage.getItem("isLogedIn"),
  userMail: localStorage.getItem("email"),
  type: localStorage.getItem("type"),
  token: localStorage.getItem("token"),
};

const authStore = createSlice({
  name: "loging",
  initialState: initial,
  reducers: {
    login(state, action) {
      state.isLogedIn = true;
      state.userMail = action.payload.email;
      state.type = action.payload.type;
      state.token = action.payload.token;
      localStorage.setItem("email", state.userMail);
      localStorage.setItem("type", state.type);
      localStorage.setItem("token", state.token);
      localStorage.setItem("isLogedIn", state.isLogedIn);
    },
    logout(state) {
      state.isLogedIn = false;
      state.userMail = null;
      state.type = null;
      localStorage.removeItem("email");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
      localStorage.removeItem("isLogedIn");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
