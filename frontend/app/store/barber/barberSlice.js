import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store"
import axios from "axios";
export const barberSlice = createSlice({
  name: "barber",
  initialState: {
    loading: true,
    barbers: [],
    errorMessage: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.loading = true;
      state.barbers = [];
      state.errorMessage = undefined;
    },
    onAllBarber: (state, action) => {
      state.loading = false;
      state.barbers = action.payload;
      state.errorMessage = undefined;
    },
    onErrorMessage: (state, { error }) => {
      state.loading = true;
      state.barbers = [];
      state.errorMessage = error;
    },
  },
});
export const getHeadersWithAuth = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const getAllBarber = () => {
  return async (dispatch) => {
    const token = store.getState().user.token;
    const headers = getHeadersWithAuth(token);
    try {
      dispatch({ type: onLoading });
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/users/all/barber`,
        { headers }
      );
      console.log(data, "datos de getallbabrber");
      if (data) {
        console.log("ingreso a data", data.body.rows);
        dispatch({ type: onAllBarber, payload: data.body.rows });
      } else {
        console.log("ocurrrio algo");
      }
    } catch (error) {
      console.log(error, "error");
      dispatch({ type: onErrorMessage, error: error });
    }
  };
};
export const { onAllBarber, onLoading, onErrorMessage } = barberSlice.actions;
export default barberSlice.reducer;
