import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const store = configureStore({
    reducer:{
        authUser: userSlice.reducer,
    }
})

export default store;
export const useAppDispatch = typeof store.dispatch 
export type RootState = ReturnType<typeof store.getState>;