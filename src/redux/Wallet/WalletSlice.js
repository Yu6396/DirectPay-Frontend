import { createSlice } from "@reduxjs/toolkit";
import { getUserWallet } from "./WalletAction";

const initialState = {
  wallet: null,
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       .addCase(getUserWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(getUserWallet.rejected, (state, action) => {
        state.loading = false;
        state.wallet = { balance: 0, currency: "NGN" }; 
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
