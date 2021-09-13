import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: localStorage.getItem("isLogedIn"),
  token: localStorage.getItem("token"),
  type: localStorage.getItem("type"),
  userID: localStorage.getItem("userID"),
  userName: localStorage.getItem("userName"),
  id: localStorage.getItem("id"),
};
localStorage.removeItem("email");
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
      state.id = action.payload.lmsID;
      localStorage.setItem("token", state.token);
      localStorage.setItem("type", state.type);
      localStorage.setItem("userID", state.userID);
      localStorage.setItem("isLogedIn", state.isLogedIn);
      localStorage.setItem("userName", state.userName);
      localStorage.setItem("id", state.id);

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        localStorage.removeItem("userID");
        localStorage.removeItem("isLogedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("id");
      }, 60000 * 60);
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
      localStorage.removeItem("id");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
