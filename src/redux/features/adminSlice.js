import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  admin:null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
    },
    setLogout: (state) => {
      state.token = null;
      state.admin = null;
    },
  },
});

export const { setLogin, setLogout } = adminSlice.actions;

export default adminSlice.reducer;
