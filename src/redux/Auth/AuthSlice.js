import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./AuthAction";

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
    showPassword: false,
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
    resetSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
    setShowpassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
        localStorage.setItem("token", action.payload?.token);
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
       
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupSuccess = false;
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const {
  setFormField,
  logout,
  resetForm,
  resetSignupSuccess,
  setShowpassword,
} = authSlice.actions;

export default authSlice.reducer;
