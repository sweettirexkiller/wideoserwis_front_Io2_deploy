import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from "./api/apiSlice";
import authReducer from './features/auth/authSlice';


export default configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})