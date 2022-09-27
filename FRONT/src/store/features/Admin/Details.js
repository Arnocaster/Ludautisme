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
    setClose : (state,ac