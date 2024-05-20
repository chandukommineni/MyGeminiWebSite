import { configureStore, createStore } from "@reduxjs/toolkit";


export const Store=configureStore({
    reducer:{
        data:mainSlice
    }
})