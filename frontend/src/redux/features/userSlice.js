import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for registration
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => { 
      state.user = action.payload;
    },
  }, // Burada digər manuel action-lar ola bilər (məsələn, logout)
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
