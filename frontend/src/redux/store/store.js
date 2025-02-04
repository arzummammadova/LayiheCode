import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/productSlice.js'
import basketReducer from '../features/basketSlice.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/userSlice.js'
const persistbasketConfig = {
  key: 'basket',
  storage,
}

const persistedbasketReducer = persistReducer(persistbasketConfig, basketReducer)
export const store = configureStore({
  reducer: {
    auth:authReducer,
    products:productsReducer,
    basket:persistedbasketReducer
  },
})

export const persistor = persistStore(store)
export default store