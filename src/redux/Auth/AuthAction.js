import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const API_URL=  "http://localhost:2029/api/v1/user"

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios(`${API_URL}/login/user`, {
        method: "POST",
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      
      const token = response.headers.authorization;
      if (!token) {
        throw new Error("Login failed");
      }
      const decodeUser= jwtDecode(token)      
      return { token, user: decodeUser };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
  

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios(`${API_URL}/create/user`, {
        method: "POST",
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
      });

        if (!response.ok) {
        throw new Error("Signup failed");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);