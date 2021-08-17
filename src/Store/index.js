import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";

const store = configureStore({
    reducer:{
        loging : authStore.reducer
    }
})

export default store;