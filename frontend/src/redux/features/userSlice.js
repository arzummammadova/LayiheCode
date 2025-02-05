import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", formData);
      alert("Registration successful! Please check your email.");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }

);
export const fetchUser= createAsyncThunk(
  'auth/fetchUser',
  async () => {
    const response = await axios("http://localhost:5000/auth")
    return response.data
  },
)

export const fetchLoginUser = createAsyncThunk(
  'auth/fetchLoginUser',
  async () => {
    const response = await axios("http://localhost:5000/auth");
    const users = response.data;

   
    const loggedInUser = users.find(user => user.isLogin === true);
    return loggedInUser || null; 
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: null,
    isLoggedIn: false,
    isAdmin: false,
    isLogin: false, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.isAdmin = action.payload?.isAdmin || false;
      state.isLogin = !!action.payload; 
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isLogin = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = true; 
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoggedIn = !!action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = !!action.payload;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = !!action.payload;
      });
  },
});
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;