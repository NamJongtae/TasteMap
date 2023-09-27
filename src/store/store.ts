import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "../slice/userSlice";
import { signupSlice } from "../slice/signupSlice";
import { postSlice } from "../slice/postSlice";
import { profileSlice } from "../slice/profileSlice";
import { commentSlice } from "../slice/commentSlice";
import { replySlice } from '../slice/replySlice';
import { tasteMapSlice } from '../slice/tasteMapSlice';
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    signup: signupSlice.reducer,
    post: postSlice.reducer,
    profile: profileSlice.reducer,
    comment: commentSlice.reducer,
    reply: replySlice.reducer,
    tasteMap: tasteMapSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
