import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: null,
  email: null,
  token: null,
  userType: null,
  userId: null,
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.number = action.payload.number;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      state.profile = action.payload.profile;
    },
    setLogout: (state) => {
      state.number = null;
      state.email = null;
      state.token = null;
      state.userType = null;
      state.userId = null;
      state.profile = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
