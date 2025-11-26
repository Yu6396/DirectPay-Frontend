import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  getUserProfile,
  verifyOtp,
  resendOtp,
  startForgetPassword,
  completeForgetPassword,
  loginWithGoogle,
  logoutUser,
} from "./AuthAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
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
        state.user = action.payload?.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed";
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

      // USER PROFILE (used to verify session)
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        
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

      // GOOGLE LOGIN (session version)
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
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
  resetForm,
  resetSignupSuccess,
  resetOtpState,
  setShowpassword,
  resetPasswordResetState,
} = authSlice.actions;

export default authSlice.reducer;
