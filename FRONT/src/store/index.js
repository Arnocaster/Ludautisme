import { configureStore} from '@reduxjs/toolkit';
import { reducer } from './reducers';
import { apiSlice } from './api/apiSlice';
const store = configureStore({
        reducer : {
            ...reducer,
            [apiSlice.reducerPath]: apiSlice.reducer
        }
        , middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(apiSlice.middleware)
    });

export default store;
