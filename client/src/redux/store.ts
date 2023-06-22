import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './userInfoSlice'
// import { offersReducer, userInfoReducer } from './reducers.tsx'



export const storeApp = configureStore({
  reducer: {
    userInfo: userInfoReducer
  }
})

export type RootState = ReturnType<typeof storeApp.getState>
export type AppDispatch = typeof storeApp.dispatch
