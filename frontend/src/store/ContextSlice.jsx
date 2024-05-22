// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import run from "../config/gemini"
// export const onSent=createAsyncThunk("onSent",(prompt,{getState,dispatch})=>{


// })


// const Mainslice=createSlice({
//     name:"data",
//     initialState:{
//         input :"",
//         recentPrompt:"",
//         prevPrompts:"",
//         showResult:false,
//         loading:false,
//         resultData:""
//     },
//     reducers:{
//         setInput:(state,action)=>{
//             state.input=action.payload
//         },
//         setRecentPrompt:(state,action)=>{
//             state.recentPrompt=action.payload
//         },
//         setPrevPrompts:(state,action)=>{
//             state.prevPrompts=[...state. prevPrompts,action.payload]

//         },
//         setShowResult:(state,action)=>{
//             state.showResult=action.payload
//         },
//         setLoading:(state,action)=>{
//             state.loading=action.payload
//         },
//         setResultData:(state,action)=>{
//             state.showResult=action.payload
//         },
//         newChat:(state,action)=>{
//             state.loading=false
//             state.showResult=false
//         }
//     },
//     extraReducers:(builder)=>{
//         builder
//         .addCase(onSent.pending,(state)=>{
    
//         })
//         .addCase(onSent.fulfilled,(state,action)=>{
            
//         })
//         .addCase(onSent.rejected,(state)=>{
//             console.log("response fetching failed")
//         })
    
//     }
// })

// export default Mainslice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import run from '../config/gemini';

export const onSent = createAsyncThunk(
  'context/onSent',
  async (prompt, { getState, dispatch }) => {
    const state = getState().data;
    let response;

    if (prompt !== undefined) {
      response = await run(prompt);
      dispatch(setRecentPrompt(prompt));
    } else {
      dispatch(setPrevPrompts(state.input));
      dispatch(setRecentPrompt(state.input));
      response = await run(state.input);
    }

    let responseArray = response.split('**');
    let newResponse = '';
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += '<div><b>' + responseArray[i] + '</b></div>';
      }
    }
    let newResponse2 = newResponse.split('*').join('</br>');
    let newResponseArray = newResponse2.split(' ');

    dispatch(setResultData('')); // Clear resultData initially
    newResponseArray.forEach((next, i) => {
      next = next.replace(/^(undefined)+|(undefined)+$/g, '');
      next = next.replace(/##/g, '');
      setTimeout(() => {
        dispatch(appendResultData(next + ' '));
      }, 75 * i);
    });

    return response;
  }
);

const contextSlice = createSlice({
  name: 'data',
  initialState: {
    input: '',
    recentPrompt: '',
    prevPrompts: [],
    showResult: false,
    loading: false,
    resultData: '',
  },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setRecentPrompt: (state, action) => {
      state.recentPrompt = action.payload;
    },
    setPrevPrompts: (state, action) => {
      state.prevPrompts = [...state.prevPrompts, action.payload];
    },
    setShowResult: (state, action) => {
      state.showResult = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    appendResultData: (state, action) => {
      state.resultData += action.payload;
    },
    newChat: (state) => {
      state.loading = false;
      state.showResult = false;
      state.resultData = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onSent.pending, (state) => {
        state.loading = true;
        state.showResult = true;
      })
      .addCase(onSent.fulfilled, (state) => {
        state.loading = false;
        state.input = '';
      })
      .addCase(onSent.rejected, (state) => {
        console.log('response fetching failed');
        state.loading = false;
      });
  },
});

export const {
  setInput,
  setRecentPrompt,
  setPrevPrompts,
  setShowResult,
  setLoading,
  setResultData,
  appendResultData,
  newChat,
} = contextSlice.actions;

export default contextSlice.reducer;
