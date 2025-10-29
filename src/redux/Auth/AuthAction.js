import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../instance/axiosInstance";
import { toast } from "../../hooks/use-toast";
import axios from "axios";

const API_URL = "/user";

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:2029/auth/google/callback"); // Adjust path if needed
      const { token, user } = response.data;

      if (!token || !user) throw new Error("Google login failed");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Google login failed",
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login/user`, userData);

      const token = response.headers?.authorization;
      if (!token) throw new Error("Login failed: No token received.");

      const decodedUser = jwtDecode(token);

      toast({
        title: "Login Successful 🎉",
        description: `Welcome back, ${decodedUser?.first_name || "User"}!`,
      });

      return { token, user: decodedUser };
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid credentials. Please try again.";

      toast({
        title: "Login Failed ❌",
        description: message,
        variant: "destructive",
      });

      return rejectWithValue({ message });
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/create/user`, userData);

      toast({
        title: "Account Created 🎉",
        description: "Your account has been successfully registered. Check your email for OTP verification.",
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong while creating your account.";

      toast({
        title: "Signup Failed ❌",
        description: message,
        variant: "destructive",
      });

      return rejectWithValue({ message });
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/verify/otp`, { email, otp });

      toast({
        title: "Verification Successful 🎉",
        description: "Your account has been verified successfully!",
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid or expired OTP. Please try again.";

      toast({
        title: "Verification Failed ❌",
        description: message,
        variant: "destructive",
      });

      return rejectWithValue({ message });
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/resend-otp`, { email });

      toast({
        title: "OTP Sent ✉️",
        description: "A new verification code has been sent to your email.",
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to resend OTP. Please try again.";

      toast({
        title: "Resend Failed ❌",
        description: message,
        variant: "destructive",
      });

      return rejectWithValue({ message });
    }
  }
);

export const startForgetPassword = createAsyncThunk(
  "auth/startForgetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/start-forget-password`, { email });

      toast({
        title: "OTP Sent ✉️",
        description: "Check your email for the verification code.",
      });

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send OTP";
      toast({
        title: "Error ❌",
        description: message,
        variant: "destructive",
      });
      return rejectWithValue({ message });
    }
  }
);

export const completeForgetPassword = createAsyncThunk(
  "auth/completeForgetPassword",
  async ({ email, otp, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/complete/forget/password`, {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      toast({
        title: "Password Reset ✅",
        description: "Your password has been updated. Please login.",
      });

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password";
      toast({ title: "Error ❌", description: message, variant: "destructive" });
      return rejectWithValue({ message });
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/get-user-profile`);

      return response.data?.data || response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch user profile.";

      toast({
        title: "Error Fetching Profile ❌",
        description: message,
        variant: "destructive",
      });

      return rejectWithValue({ message });
    }
  }
);
