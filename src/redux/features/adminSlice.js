import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = adminSlice.actions;

export default adminSlice.reducer;
