import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     references:[]      //!MODIF
    ,status:null
}

export default createSlice({
  name: 'references',    //!MODIF
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
    setStatus: (state, action) => {
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        state.status = action.payload.status;
        state.references = (action.payload.data)   //!MODIF
                            ? action.payload.data 
                            : state.references;
    },
    // updateReference:(state,action) => {
    //     console.log('state',state.users,'action',action);
    //     //const user = state.user.find((user)=>user.id === action.payload.id);
    //     //console.log(user);
    // }
  },
})
