import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/api";
import { errorThunkMiddleware } from "./api/middlewares";
import { usersTableReducer } from "./slices";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    usersTable: usersTableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, errorThunkMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
