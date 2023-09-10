import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "../slice/userSlice";
import { signupSlice } from '../slice/signupSlice';
import { postSlice } from '../slice/postSlice';
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    signup: signupSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
