import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: localStorage.getItem("isLogedIn"),
  token: localStorage.getItem("token"),
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
      state.type = action.payload.type;
      state.userID = action.payload.id;
      state.userName = action.payload.name;
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
      localStorage.setItem("type", state.type);
      localStorage.setItem("userID", state.userID);
      localStorage.setItem("isLogedIn", state.isLogedIn);
      localStorage.setItem("userName", state.userName);

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        localStorage.removeItem("userID");
        localStorage.removeItem("isLogedIn");
        localStorage.removeItem("userName");
      }, 60000 * 30);
    },
    logout(state) {
      state.isLogedIn = false;
      state.userMail = null;
      state.type = null;
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("userID");
      localStorage.removeItem("isLogedIn");
      localStorage.removeItem("userName");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
