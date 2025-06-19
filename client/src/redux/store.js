// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice'; // example slice

// const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export default store;


// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 🔸 Define persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// 🔸 Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// 🔸 Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔸 Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
