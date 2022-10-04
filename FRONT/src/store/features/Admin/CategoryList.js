import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     categories:[]      //!MODIF
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
        state.categories = (action.payload.data)   //!MODIF
                            ? action.payload.data 
                            : state.categories;    //!MODIF
    },
    // updateReference:(state,action) => {
    //     console.log('state',state.users,'action',action);
    //     //const user = state.user.find((user)=>user.id === action.payload.id);
    //     //console.log(user);
    // }
  },
})
