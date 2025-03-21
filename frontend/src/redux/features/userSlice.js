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
export const fetchUser = createAsyncThunk("auth/fetchUser", async ({ sortOrder, isAdmin, search }) => {
  const response = await fetch(`http://localhost:5000/auth?sort=${sortOrder}&isAdmin=${isAdmin}&search=${search}`);
  const data = await response.json();
  return data;
});


export const fetchUsersort = createAsyncThunk(
  'auth/fetchUsersort',
  async ({ sortOrder, isAdmin, search }) => {
    const response = await axios.get(
      `http://localhost:5000/auth?sort=${sortOrder}&isAdmin=${isAdmin}&search=${search}`
    );
    return response.data;
  }
);

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
     
     
      const response = await axios.post('http://localhost:5000/auth/addToRead', {
        userId,
        bookId
      });

     
      const user = response.data.user;
      return user; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const addAndRemoveFav = createAsyncThunk(
  "auth/addAndRemoveFav",
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/${userId}/favorites`,
        { bookId }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
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



export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = localStorage.getItem('token');
  if (!token) return { isAdmin: false, isAuthenticated: false };

  const response = await fetch('/api/auth/check', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return { isAdmin: false, isAuthenticated: false };

  const data = await response.json();
  return { isAdmin: data.isAdmin, isAuthenticated: true };
});





//!add and delete fav


export const fetchfav = createAsyncThunk(
  'auth/fetchfav',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/${userId}/getfavorites`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteallfav = createAsyncThunk(
  "auth/deleteallfav",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/delallfavorites`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deletefromfav = createAsyncThunk(
  'auth/deletefromfav',
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/delfavorites/${bookId}`);
      return { bookId, user: response.data.user };
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

//?readed aid olanlar
//! http://localhost:5000/auth/addreaded 
export const addtoreaded=createAsyncThunk(
  "auth/addtoreaded",
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/auth/addreaded `, {
        userId,
        bookId,
      });

      if (response.data.message) {
        return rejectWithValue(response.data.message);
      }

      return response.data.user; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Xəta baş verdi.");
    }
  }

)
export const fetchreaded=createAsyncThunk(
  'auth/fetchreaded',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/${userId}/getreaded`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
)
export const deleteAllFromreaded = createAsyncThunk(
  "auth/deleteAllFromToreaded",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/deleteallreaded`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deletefromReaded = createAsyncThunk(
  'auth/deleteFromreaded',
  async ({ userId, bookId }, { rejectWithValue }) => {
    try {
     
      const response = await axios.delete(`http://localhost:5000/auth/${userId}/deletereaded/${bookId}`);
      return { bookId, user: response.data.user }; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    users: [],
    isLoggedIn: false,
    isAdmin: false,
    toReadBooks: [],
    isLogin: false, 
    status: 'idle',
    favorites: [],
    readed:[],
    error: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.users = action.payload;
      state.isLoggedIn = !!action.payload;
      state.isAdmin = action.payload?.isAdmin || false;
      state.isLogin = !!action.payload; 
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isLogin = false; 
       state.favorites = []; 

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
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload || [];
        state.isLoggedIn = !!action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = !!action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isAdmin = false;
        state.isLogin = false;
        state.isLoading = false;
      })
      .addCase(fetchUsersort.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoggedIn = !!action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = !!action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
        state.isLogin = !!action.payload;
      })
      .addCase(addtoRead.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
      })
   
    
      .addCase(fetchToReadBooks.fulfilled, (state, action) => {
        state.toReadBooks = action.payload; 
      })
      .addCase(fetchfav.fulfilled, (state, action) => {
        state.favorites = action.payload; 
     
      })
      .addCase(deleteFromToRead.fulfilled, (state, action) => {
        state.toReadBooks = state.toReadBooks.filter(book => book._id !== action.payload.bookId);
      })
      .addCase(deleteAllFromToRead.fulfilled, (state, action) => {
        state.toReadBooks = [];
      })

      //?readed aid olan
      .addCase(addtoreaded.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readed = action.payload; 
      })
      .addCase(fetchreaded.fulfilled, (state, action) => {
        state.readed = action.payload; 
      })

     
      .addCase( deleteAllFromreaded.fulfilled, (state, action) => {
        state.readed = [];
      })
      .addCase(deletefromReaded.fulfilled, (state, action) => {
        state.readed = state.readed.filter(book => book._id !== action.payload.bookId);
      })


      .addCase(addAndRemoveFav.pending, (state) => {
        state.status = "loading";
      })
    
      .addCase(addAndRemoveFav.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addAndRemoveFav.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteallfav.fulfilled, (state, action) => {
        state.favorites = [];
      })
      .addCase(deletefromfav.fulfilled, (state, action) => {
        const { userId, bookId } = action.payload;
        state.favorites = state.favorites.filter(book => book._id !== action.payload.bookId);
      })
     
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAdmin = action.payload.isAdmin;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAdmin = false;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;