import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/AuthSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        
        
    }
})

export default store