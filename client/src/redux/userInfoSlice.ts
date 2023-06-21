import { AnyAction, Slice, createSlice } from "@reduxjs/toolkit";
import { User, UserFromBackend } from "../dataTypes";

export const userInfoSlice: Slice = createSlice({
  name: 'userInfo',
  initialState: [],
  reducers: {
    addUser(state: UserFromBackend[], action: AnyAction) {
      state.push(action.payload)
    },
    logoutUser(state: UserFromBackend[], action: AnyAction) {
      state.pop();
    }
  }
})

export const { addUser, logoutUser } = userInfoSlice.actions
export default userInfoSlice.reducer