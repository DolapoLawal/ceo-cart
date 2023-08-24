import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice';
import productSlideReducer from "./productSlide";

export const store = configureStore({
    reducer: {
        user :  userSliceReducer,
        product : productSlideReducer
    },
  });

// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "./productSlice";

// const store = configureStore({
//   reducer: {
//     product: productReducer, // "product" corresponds to the slice name
//   },
// });

// export default store;