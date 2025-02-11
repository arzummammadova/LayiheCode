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

export const addtoRead = createAsyncThunk(
  'auth/addToRead',
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
     
      // Kitabı istifadəçinin "toRead" siyahısına əlavə etmək üçün post göndəririk
      const response = await axios.post('http://localhost:5000/auth/addToRead', {
        userId,
        bookId
      });

      // Serverdən cavab alırıq
      const user = response.data.user;
      return user; // Geri qaytarırıq ki, redux store-da saxlanılsın
    } catch (error) {
      return rejectWithValue(error.response.data); // Xətaları idarə etmək üçün
    }
  }
);

export const fetchToReadBooks = createAsyncThunk(
  'auth/fetchToReadBooks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/${userId}/getaddtoread`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

export const deleteFromToRead = createAsyncThunk(
  'auth/deleteFromToRead',
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/to-read/${bookId}`);
      return { bookId, user: response.data.user }; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllFromToRead = createAsyncThunk(
  "auth/deleteAllFromToRead",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/to-read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: null,
    isLoggedIn: false,
    isAdmin: false,
    toReadBooks: [],
    isLogin: false, 
      status: 'idle'
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
      })
      .addCase(addtoRead.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Serverdən gələn istifadəçi məlumatını saxlayırıq
      })
   
    
      .addCase(fetchToReadBooks.fulfilled, (state, action) => {
        state.toReadBooks = action.payload; // Update the toReadBooks array with the fetched data
      })
      .addCase(deleteFromToRead.fulfilled, (state, action) => {
        state.toReadBooks = state.toReadBooks.filter(book => book._id !== action.payload.bookId);
      })
      .addCase(deleteAllFromToRead.fulfilled, (state, action) => {
        state.toReadBooks = [];
      });

  },
});
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;