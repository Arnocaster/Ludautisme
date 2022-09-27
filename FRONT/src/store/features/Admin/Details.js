import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:false
    ,submitAction : {actionName:'null',params:{param:null,body:null}}
    ,reducer : null
    ,mode : null
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setContent : (state,action) => {
        state.content = action.payload;
    },
    setOpen : (state,action) => {
        state.open = true;
    },
    setClose : (state,action) => {
        state.open = false;
    },
    setSubmitPayload:(state,action)  => {
      state.submitAction = action.payload; // mutate the state all you want with immer
    },
    setReducer:(state,action) => {
        state.reducer = action.payload.charAt(0).toUpperCase() + action.payload.slice(1); //Capitalise for redux apiSlice automatic function naming 
    },
    setMode:(state,action) => {
        state.mode = action.payload;
    }
  },
});
