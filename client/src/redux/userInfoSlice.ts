import { Slice, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loggedIn: false,
  user: {
    name: '',
    email: '',
    image: '',
    offers: [],
  },
  accessToken: '',
}

export const userInfoSlice: Slice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
