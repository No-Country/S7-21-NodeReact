import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", //'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLoginError: (state, { error }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = error;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
export const loginuser = (payload) => {
  return async (dispatch) => {
    console.log(payload, "datos")
    try {
      dispatch({ type: onChecking });
      const {data}= await axios.post("http://localhost:8080/api/v1/auth/login", payload);
      console.log(data, "json")
      if (data) {
        dispatch({ type: onLogin, payload: data.body.user });
        return data;
      }
    } catch (error) {
      dispatch({ type: onLoginError, payload: error });
    }
  };
};

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onLoginError,
} = authSlice.actions;
export default authSlice.reducer;
