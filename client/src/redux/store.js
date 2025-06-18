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

export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})