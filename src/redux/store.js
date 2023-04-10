import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { shazamApi } from "./services/shazam";
import {userSlice} from './features/userSlice'
import playerReducer from "./features/playerSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key : "root",
  version : 1,
  storage,
};

const UserPersistReducer = persistReducer(persistConfig,userSlice.reducer)

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    player: playerReducer,
    userSlice:UserPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
      },
    }).concat(shazamApi.middleware),
});

export const persistor = persistStore(store)