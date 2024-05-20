import { createSlice } from "@reduxjs/toolkit";




const Mainslice=createSlice({
    name:"data",
    initialState:{
        input :"",
        recentPrompt:"",
        prevPrompts:"",
        showResult:false,
        loading:false,
        resultData:""
    },
    reducers:{
        setInput:(state,action)=>{
            state.input=action.payload
        },
        setRecentPrompt:(state,action)=>{
            state.recentPrompt=action.payload
        },
        setPrevPrompts:(state,action)=>{
            state.prevPrompts=[...state. prevPrompts,action.payload]

        },
        setShowResult:(state,action)=>{
            state.showResult=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setResultData:(state,action)=>{
            state.showResult=action.payload
        },
        newChat:(state,action)=>{
            state.loading=false
            state.showResult=false
        }
    }
})