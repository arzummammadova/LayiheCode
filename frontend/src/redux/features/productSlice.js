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

  // export const postProduct= createAsyncThunk(
  //   'products/postProduct',
  //   async (newProduct) => {
  //     const response = await axios.post("http://localhost:5000/api/books",newProduct)
  //     return response.data
  //   },
  // )
  export const postProduct = createAsyncThunk(
    'products/postProduct',
    async (productData) => {
      const response = await axios.post(
        'http://localhost:5000/api/books', 
        productData, 
        {
          headers: {
            'Content-Type': 'application/json', // JSON olaraq göndər
          },
        }
      );
      return response.data;
    }
  );
//   export const postProduct = createAsyncThunk(
//     'products/postProduct',
//     async (formData) => {
//       const response = await axios.post("http://localhost:5000/api/books", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for file uploads
//         },
//       });
//       return response.data; // Return the created product
//     }
// );


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


const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
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
  },

 
})



export default productSlice.reducer