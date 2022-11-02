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
        state.primary.open = true;
        state.secondary.open = (action.payload !== 'primary');
    },
    setClose : (state,action) => {
        state[action.payload].open = false;
        if (action.payload === 'primary') {state.secondary.open = false;}; 
    },
    setSubmitPayload:(state,action)  => {
      state.submitAction = action.payload; // mutate the state all you want with immer
    },
    setReducer:(state,action) => {
        const {reducer,level} = action.payload;
        state[level].reducer = reducer.charAt(0).toUpperCase() + reducer.slice(1); //Capitalise for redux apiSlice automatic function naming 
    },
    setMode:(state,action) => {
        const {mode,level} = action.payload;
        state[level].mode = mode;
    }
  },
});
