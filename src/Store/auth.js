import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isLogedIn: false,
};

const authStore = createSlice({
  name: "loging",
  initialState: initial,
  reducers: {
    login(state) {
      state.isLogedIn = true
    },
    logout(state) {
      state.isLogedIn = false;
    },
  },
});

export default authStore;

export const loginAction = authStore.actions;
