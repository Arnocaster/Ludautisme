import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    primary : {
            open:false
            ,reducer : null
            ,mode : null
    },
    secondary : {
            open:false
            ,reducer : null
            ,mode : null
    }
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setContent : (state,action) => {
        state.content = action.payload;
    },
    setOpen : (state,action) => {
        (action.payload === 'primary')
            ? state.primary.open = true
            : state.secondary.open = true
    },
    setClose : (state,action) => {
        state.primary.open = (action.payload === 'primary') ? false : state.primary.open;
        state.secondary.open = false
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
