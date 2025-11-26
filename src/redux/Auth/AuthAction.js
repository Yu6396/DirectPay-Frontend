import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../instance/axiosInstance";
import { toast } from "../../hooks/use-toast";


const API_URL = "/user";

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/google/callback", {
        withCredentials: true,
      });

      const user = response.data?.user;
      if (!user) throw new Error("No user returned from Google login");

      toast({
        title: "Welcome 🎉",
        description: `Logged in as ${user.first_name || user.email}`,
      });

      return { user };
    } catch (error) {
      const message = error.response?.data?.message || "Google login failed";
      toast({
        title: "Google Login Failed ❌",
        description: message,
        variant: "destructive",
      });
      return rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      await api.post(`${API_URL}/login/user`, credentials, {
        withCredentials: true,
      });

      const response  = await api.get(`${API_URL}/get-user-profile`, {
        withCredentials: true,
      });

      toast({
        title: "Login Successful 🎉",
        description: `Welcome back, ${response.data.first_name || "User"}!`,
      });

      return { user: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Login faileddddd";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      return rejectWithValue({ message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(`${API_URL}/logout`, {}, { withCredentials: true });

      toast({
        title: "Logged Out 👋",
        description: "You have been successfully logged out.",
      });

      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast({
        title: "Logout Failed ❌",
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
        description:
          "Your account has been registered. Check your email for OTP verification.",
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error ||
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
        error.response?.data?.message ||
        "Invalid or expired OTP. Please try again.";
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
      const response = await api.post(`${API_URL}/start-forget-password`, {
        email,
      });

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
      const message =
        error.response?.data?.message || "Failed to reset password";
      toast({
        title: "Error ❌",
        description: message,
        variant: "destructive",
      });
      return rejectWithValue({ message });
    }
  }
);


export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/get-user-profile`, {
        withCredentials: true,
      });

      const user = response.data?.user || response.data?.data;

      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch user profile.";
      return rejectWithValue({ message });
    }
  }
);
