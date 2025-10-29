import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/AuthSlice";
import walletSlice from "./Wallet/WalletSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        wallet: walletSlice
        
        
    }
})

export default store