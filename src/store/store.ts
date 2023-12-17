import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "../slice/userSlice";
import { postSlice } from "../slice/postSlice";
import { commentSlice } from "../slice/commentSlice";
import { replySlice } from '../slice/replySlice';
import { tasteMapSlice } from '../slice/tasteMapSlice';
import { searchSlice } from '../slice/searchSlice';
import { settingSlice } from '../slice/settingSlice';
import { signupSlice } from '../slice/signupSlice';
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    reply: replySlice.reducer,
    tasteMap: tasteMapSlice.reducer,
    search: searchSlice.reducer,
    signup: signupSlice.reducer,
    setting: settingSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
