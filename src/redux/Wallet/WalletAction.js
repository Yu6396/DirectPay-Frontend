import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../instance/axiosInstance";




export const getUserWallet = createAsyncThunk(
  "wallet/getUserWallet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user/get-user-wallet");
      return response.data?.data || response.data; 
    } catch (error) {
      
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth";
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to load wallet"
      );
    }
  }
);