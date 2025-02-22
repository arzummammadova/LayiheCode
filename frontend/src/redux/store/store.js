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
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["favorites"], 
};
const persistedbasketReducer = persistReducer(persistbasketConfig, basketReducer)
const persistauthReducer=persistReducer(authPersistConfig,authReducer,)
export const store = configureStore({
  reducer: {
    auth:persistauthReducer,
    products:productsReducer,
    basket:persistedbasketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
      },
    }),
})

export const persistor = persistStore(store)
export default store