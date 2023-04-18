import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../store";
export const serviceSlice = createSlice({
  name: "turner",
  initialState: {
    loadingService: true,
    services: [],
    errorMessage: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.loadingService = true;
      state.services = [];
      state.errorMessage = undefined;
    },
    onGetService: (state, { payload }) => {
      state.loadingService = false;
      state.services = payload;
      state.errorMessage = undefined;
    },
    onMessageError: (state, { error }) => {
      state.loadingService = false;
      state.services = {};
      state.errorMessage = error;
    },
  },
});
export const getHeadersWithAuth = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllServices = () => {
  const local_url = window.ENV.REMIX_APP_API_UR
  return async (dispatch) => {
    const token = store.getState().user.token;
    const headers = getHeadersWithAuth(token);
    try {
      dispatch({ type: onLoading });
      const { data } = await axios.get(
        `${local_url}/servicesbarber`,
        { headers }
      );
      console.log(data, "data de servicios disponibles");
      if (data) {
        dispatch({ type: onGetService, payload: data.body });
      }
    } catch (error) {
      dispatch({ type: onMessageError, error: error });
    }
  };
};
export const { onLoading, onGetService, onMessageError } = serviceSlice.actions;
export default serviceSlice.reducer;
