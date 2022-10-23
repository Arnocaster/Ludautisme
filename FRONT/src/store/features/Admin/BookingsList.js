import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     allItems:[]      //!MODIF
    ,activeItem : {}
    ,activeErrors : {}
    ,status:null
}

export default createSlice({
  name: 'bookings',    //!MODIF
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        state.status = action.payload.status;
        state.allItems = (action.payload.data)   //!MODIF
                            ? action.payload.data 
                            : state.allItems;
    },
    updateActive:(state,action) => {
        console.log('updateActive');
        //console.log('state',state.activeItem,'action',action, {...state.activeItem,...action.payload});
        const cleanedPayload = {...action.payload};
        const emptyEntries = Object.entries(action.payload).filter((entrie)=> entrie[1].length < 1).map((ent)=>ent[0]);
        emptyEntries.forEach((ent)=> {delete cleanedPayload[ent]; delete state.activeItem[ent];});
        console.log(cleanedPayload);
        state.activeItem = {...state.activeItem,...cleanedPayload};
    },
    updateError:(state,action) => {
        console.log('updateError');
        state.activeErrors = {...state.activeErrors,...action.payload};
    },
    removeError:(state,action) => {
        console.log('removeError');
        const propToRemove = Object.keys(action.payload)[0];
        const removedError = {...state.activeErrors}
        delete removedError[propToRemove];
        state.activeErrors = (removedError) ? {...removedError} : {};
    },
    removeOne:(state,action) => {
        console.log('removeOne from allItems');
        const entries = Object.entries(action.payload);
        const prop = entries[0];
        const value = entries[1];
        const removedArr = state.allItems[prop].filter((val)=> val !== value);
        console.log(removedArr);
        //console.log(user);
    },
    setActiveItem:(state,action) => {
        state.activeItem = {...action.payload};
    },
    clearActiveItem:(state,action) => {
        state.activeItem = {};
    }
  },
})
