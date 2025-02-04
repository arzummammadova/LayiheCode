import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    basket: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

        addtobasket: (state, action) => {
            const existingproduct = state.basket.find((product) => product._id == action.payload._id)
            if (existingproduct) {
                existingproduct.count++
            }
            else {
                state.basket.push({ ...action.payload, count: 1 })
            }


        },
        deletebasket: (state, action) => {
           state.basket= state.basket.filter((product)=>product._id!==action.payload)

        },


    },
})

export const { addtobasket, deletebasket } = basketSlice.actions

export default basketSlice.reducer