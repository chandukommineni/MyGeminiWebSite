import { configureStore, createStore } from "@reduxjs/toolkit";
import ContextSlice from "./ContextSlice";

export const Store=configureStore({
    reducer:{
      data:ContextSlice
    }
})