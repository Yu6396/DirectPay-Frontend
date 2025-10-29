import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  getUserProfile,
  verifyOtp,
  resendOtp,
  startForgetPassword,
  completeForgetPassword,
  loginWithGoogle
} from "./AuthAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    form: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
    },
    error: null,
    loading: false,
    signupSuccess: false,
    otpVerified: false,
    otpSent: false,
    showPassword: false,
    passwordReset: false,
    passwordResetToastShown: false,

  },

  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    resetForm: (state) => {
      state.form = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
      };
    },
     resetPasswordResetState: (state) => {
    state.passwordReset = false;
    state.passwordResetToastShown = false;
  },
    resetSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
    resetOtpState: (state) => {
      state.otpVerified = false;
      state.otpSent = false;
    },
    setShowpassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload?.token);
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload?.message || "Signup failed";
      })

      // OTP VERIFICATION
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpVerified = false;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = action.payload?.message || "OTP verification failed";
      })

      // RESEND OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload?.message || "Failed to resend OTP";
      })

      // USER PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user profile";
      })

      // START FORGET PASSWORD
      .addCase(startForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(startForgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(startForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload?.message || "Failed to send OTP";
      })

      // COMPLETE FORGET PASSWORD
      .addCase(completeForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordReset = false;
      })
      .addCase(completeForgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordReset = true;
      })
      .addCase(completeForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordReset = false;
        state.error = action.payload?.message || "Password reset failed";
      })
       // Google login
    .addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    })
    .addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Google login failed";
    });
  },
});

export const {
  setFormField,
  logout,
  resetForm,
  resetSignupSuccess,
  resetOtpState,
  setShowpassword,
  resetPasswordResetState,
} = authSlice.actions;

export default authSlice.reducer;
