import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
export const turnerSlice = createSlice({
  name: "turner",
  initialState: {
    loading: true,
    loadingTurner: true,
    turner: {},
    turners: [],
    errorMessage: undefined,
    errorMessageTurner: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.loading = true;
      state.turner = {};
      state.errorMessage = undefined;
    },
    onTurner: (state, { payload }) => {
      state.loading = false;
      state.turner = payload;
      state.errorMessage = undefined;
    },
    onTurnerError: (state, { error }) => {
      state.loading = true;
      state.turner = {};
      state.errorMessage = error;
    },
    onLoadingTurner:(state, {payload}) => {
      state.loadingTurner = true;
      state.turners = []
      state.errorMessage = undefined
    },
    onTurnerHistory: (state, { payload }) => {
      state.loadingTurner = false;
      state.turners = payload
      state.errorMessage = undefined
    },
    onMessageTurnersError: (state, { error }) => {
      state.loadingTurner = false;
      state.turners = []
      state.errorMessage = error
    }
  },
});
export const getHeadersWithAuth = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const createturne = (payload, barber) => {
  return async (dispatch) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlNGFhNTVkLTFiYjctNDMyMS1hMmVjLTQ4MDkzMDE1YzIzYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTQyMTMwMiwiZXhwIjoxNjgyNjU0ODUwfQ.4D1rJKlx6guDSUyGRLTpZ6gLTERpbsIGgGPd65k0VjA"; // aquí deberías obtener el token de autenticación desde el estado de Redux
    const headers = getHeadersWithAuth(token);
    try {
      dispatch({ type: onLoading });
      const {data } = await axios.post(
        `http://localhost:8080/api/v1/appointments/${barber}`,
        payload, {headers}
      );
      console.log(data);
      if (data) {
        dispatch({ type: onTurner, payload: data.body });
        return data;
      }
    } catch (error) {
      dispatch({ type: onTurnerError, error: error });
    }
  };
};
export const historyTurner = (payload) =>{
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlNGFhNTVkLTFiYjctNDMyMS1hMmVjLTQ4MDkzMDE1YzIzYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTQyMTMwMiwiZXhwIjoxNjgyNjU0ODUwfQ.4D1rJKlx6guDSUyGRLTpZ6gLTERpbsIGgGPd65k0VjA"; // aquí deberías obtener el token de autenticación desde el estado de Redux
const headers = getHeadersWithAuth(token);
  return async (dispatch) => {
    try {
      dispatch({ type: onLoadingTurner})
      const { data } = await axios.get(`http://localhost:8080/api/v1/appointments/${payload}`, {headers})
      console.log(data)
      if(data){
        dispatch({type: onTurnerHistory, payload: data})
      }
    } catch (error) {
      console.log(error, "error")
      dispatch({type: onMessageTurnersError, error: error})
    }
  }
}

export const { onLoading, onTurner, onTurnerError, onLoadingTurner, onMessageTurnersError, onTurnerHistory } = turnerSlice.actions;
export default turnerSlice.reducer;
