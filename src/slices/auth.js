import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messege";

import AuthService from "../services/auth.service";

const token = JSON.parse(localStorage.getItem("token"));

export const register = createAsyncThunk(
  "auth/register",
  async ({  nickname, firstname, lastname,userType,email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register( nickname, firstname, lastname,userType,email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { token: data };
    } catch (error) {
      thunkAPI.dispatch(setMessage(error.response.data));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {

      state.isLoggedIn = true;
      state.token = action.payload.token;

    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
