import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     allItems:[]      //!MODIF
    ,status:null
}

export default createSlice({
  name: 'category',    //!MODIF
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        state.status = action.payload.status;
        state.allItems = (action.payload.data)   //!MODIF
                            ? action.payload.data 
                            : state.allItems;    //!MODIF
    },
    // updateReference:(state,action) => {
    //     console.log('state',state.users,'action',action);
    //     //const user = state.user.find((user)=>user.id === action.payload.id);
    //     //console.log(user);
    // }
  },
})
