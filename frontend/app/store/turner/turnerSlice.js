import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
        state.loading = true
        state.turner = {}
        state.errorMessage = error
    }
  },
});

export const createturne = (payload, barber) => {
    return async(dispatch) => {
        try {
            dispatch({ type: onLoading}) 
            const json = await axios.post(`http://localhost:8080/api/v1/appointments/${barber})`, payload)
            console.log(json)
            if(json) {
                dispatch({ type: onTurner, payload: json})
            }
        } catch (error) {
            dispatch({ type: onTurnerError, error: error})
        }
    }
}

export const { onLoading, onTurner, onTurnerError } = turnerSlice.actions
export default turnerSlice.reducer