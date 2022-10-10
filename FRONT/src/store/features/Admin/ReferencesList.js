import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     references:[]      //!MODIF
    ,status:null
}

export default createSlice({
  name: 'references',    //!MODIF
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        state.status = action.payload.status;
        state.references = (action.payload.data)   //!MODIF
                            ? action.payload.data 
                            : state.references;
    },
    update:(state,action) => {
        console.log('state',state.users,'action',action);
        //const user = state.user.find((user)=>user.id === action.payload.id);
        //console.log(user);
    },
    removeOne:(state,action) => {
        console.log('state',state.users,'action',action);
        const entries = Object.entries(action.payload);
        const prop = entries[0];
        const value = entries[1];
        const removedArr = state.users[prop].filter((val)=> val !== value);
        console.log(removedArr);
        //console.log(user);
    }
  },
})
