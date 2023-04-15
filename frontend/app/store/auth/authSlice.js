import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", //'authenticated', 'not-authenticated'
    user: {},
    token: null,
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload.user;
      state.token = payload.token
      state.errorMessage = undefined;
    },
    onLoginError: (state, { error }) => {
      console.log(error, "error")
      state.status = "not-authenticated";
      state.errorMessage = error;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.token = null
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
export const loginuser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "onChecking" });
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/login", payload);

      if (data) {

        const { user, token } = data.body;
        dispatch({ type: "onLogin", payload: { user, token } });

        return data;
      }
    } catch (error) {
      dispatch({ type: "onLoginError", error: error.response.data.error });
    }
  };
};

export const registeruser = (payload) => {
  return async (dispatch) => {
    console.log(payload, "datos")
    try {
      dispatch({ type: "onChecking" });
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/register", payload);

      if (data) {
        return data;
      }
    } catch (error) {
      dispatch({ type: "onLoginError", error: error.response.data.error });
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
