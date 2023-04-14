import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
export const turnerSlice = createSlice({
  name: "turner",
  initialState: {
    loading: true,
    turner: {},
    errorMessage: undefined,
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmNWUyMWM2LThhODUtNDEwYy04OWVjLWQyNjllMjIwZDI4YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTM4ODM0NiwiZXhwIjoxNjgyNjIxODk0fQ.PDdXetHKNYTOyKP2Z7El86AKnMIVqZNQy4v2LYec0d4"; // aquí deberías obtener el token de autenticación desde el estado de Redux
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

export const { onLoading, onTurner, onTurnerError } = turnerSlice.actions;
export default turnerSlice.reducer;
