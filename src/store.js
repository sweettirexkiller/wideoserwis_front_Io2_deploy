import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/messege';
import { authAPI } from './services/authAPI';
import { setupListeners } from '@reduxjs/toolkit/query';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  [authAPI.reducerPath]:authAPI.reducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
  devTools: true
})


setupListeners(store.dispatch);

export default store;