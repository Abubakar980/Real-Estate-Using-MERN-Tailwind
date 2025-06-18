// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice'; // example slice

// const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

export const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);