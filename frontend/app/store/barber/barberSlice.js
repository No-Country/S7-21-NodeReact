import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store"
import axios from "axios";
import { store } from "../store";
export const barberSlice = createSlice({
  name: "barber",
  initialState: {
    loading: true,
    barbers: [],
    errorMessage: undefined,
    loadingBarber: true,
    barber: [],
    errorGetBarber: undefined,
    freeTurner: [],
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
      state.loading = false;
      state.barbers = [];
      state.errorMessage = error;
    },
    onLoadingBarber: (state) => {
      state.loadingBarber = true;
      state.barber = [];
      state.errorGetBarber = undefined;
      state.freeTurner = [];
    },
    onGetBarber: (state, action) => {
      console.log(state.barber)
      console.log(action, "payload")
      state.loadingBarber = false;
      state.barber = action.payload;
      state.errorGetBarber = undefined;
      state.freeTurner = getFreeTurners(state.barber)
     console.log(state.barber)
    },
    onErrorGetBarber: (state, { error }) => {
      state.loadingBarber = false;   
      state.barber = [];
      state.errorGetBarber = error;
      state.freeTurner = [];
    },
  },
});
const getFreeTurners = (appintHour) => {
  console.log(appintHour)
  const openingTime = 9; // hora de apertura
  const closingTime = 18; // hora de cierre
  const occupiedTurners = appintHour.map((appointment) => appointment.turner);
  const freeTurners = [];

  for (let i = openingTime; i < closingTime; i++) {
    if (!occupiedTurners.includes(i + 0.5) && !occupiedTurners.includes(i)) {
      freeTurners.push(i);
    }
  }
console.log(freeTurners, "turnos libres")
  return freeTurners;
};
export const getHeadersWithAuth = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const getAllBarber = () => {
  return async (dispatch) => {
    const token = store.getState().user.token;
    const headers = getHeadersWithAuth(token);
    console.log(headers);
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
export const TurnersBarber = (payload) => {
  return async (dispatch) => {
    const token = store.getState().user.token;
    const headers = getHeadersWithAuth(token);
    try {
      dispatch({ type: onLoadingBarber });
      const {data} = await axios.get(
        `http://localhost:8080/api/v1/appointments/${payload}`,
        { headers }
      );
      console.log(data.body, "data");
      if (data) {
        dispatch({ type: onGetBarber, payload: data.body });
      }
    } catch (error) {
      dispatch({ type: onErrorGetBarber, error: error });
    }
  };
};
export const {
  onAllBarber,
  onLoading,
  onErrorMessage,
  onLoadingBarber,
  onGetBarber,
  onErrorGetBarber,
} = barberSlice.actions;
export default barberSlice.reducer;
