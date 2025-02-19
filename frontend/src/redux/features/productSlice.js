import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProduct= createAsyncThunk(
    'products/fetchProduct',
    async () => {
      const response = await axios("http://localhost:5000/api/books")
      return response.data
    },
  )


  export const deleteProduct= createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
       await axios.delete(`http://localhost:5000/api/books/${id}`)
      return id
    },
  )

  export const postProduct = createAsyncThunk(
    'products/postProduct',
    async (productData) => {
      const response = await axios.post(
        'http://localhost:5000/api/books', 
        productData, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    }
  );


  export const sortPriceHigh= createAsyncThunk(
    'products/sortPriceHigh',
    async () => {
      const response = await axios("http://localhost:5000/api/books")
      const sorted=response.data.sort((a,b)=>a.price-b.price)
      return sorted
    },
  )
  export const sortPriceLow= createAsyncThunk(
    'products/sortPriceLow',
    async () => {
      const response = await axios("http://localhost:5000/api/books")
      const sorted=response.data.sort((a,b)=>b.price-a.price)
      return sorted
    },
  )

  export const searchProduct = createAsyncThunk(
   
    'products/searchBooks',
  async (query) => {
    const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
    return response.data;
  }
  );

  export const sortRatingHtL = createAsyncThunk(
    "books/sortRatingHtL",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/books/sort/rating-high-to-low");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
    
  );
  export const sortRatingLtH = createAsyncThunk(
    "books/sortRatingLtH",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/books/sort/rating-low-to-high");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const sortByLang = createAsyncThunk(
    "books/sortByLang",
    async (order, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/books/sort/lang?order=${order}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
  
export const filterByCategory = createAsyncThunk(
  "books/filterByCategory",
  async (category, { rejectWithValue }) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/books/filter/category?category=${category}`);
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);
const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  searchResults: [],
  reducers: {
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
          state.products[index] = action.payload; 
      }
      
  }
  
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products=action.payload
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products=state.products.filter((product)=>product._id!==action.payload)
      })

      .addCase(postProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
      })

     
      .addCase(sortPriceHigh.fulfilled, (state, action) => {
        state.products=action.payload
      })
      .addCase(sortPriceLow.fulfilled, (state, action) => {
        state.products=action.payload
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        // localStorage.setItem('searchResults', JSON.stringify(action.payload)); 
      })
    
    
      .addCase(sortRatingHtL.fulfilled, (state, action) => {
        state.loading = false;
        state.products= action.payload;
      })
      .addCase(sortRatingLtH.fulfilled, (state, action) => {
        // console.log("Sorted Books:", action.payload);
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(sortByLang.fulfilled, (state, action) => {
        state.products = action.payload;
    })
    .addCase(filterByCategory.fulfilled, (state, action) => {
      state.products = action.payload;
  });
      
  },

 
})


export const { updateProduct } = productSlice.actions;
export default productSlice.reducer