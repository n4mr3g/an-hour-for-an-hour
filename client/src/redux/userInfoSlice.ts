import { Slice, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserFromBackend } from "../dataTypes";


interface UserState {
  loggedIn: boolean;
  user: User;
  accessToken: string;
}


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
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
