import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {actions} from '../../../../../store/reducers';
import { apiSlice } from '../../../../../store/api/apiSlice.js';
import './admindetailsinput.scss';
import {TextField} from '@mui/material/';

const AdminDetailsInput = ({reducer,
                            label,
                            reducerValue,
                            reducerProp,
                            reducerList,
                            reducerListValueProp,
                            reducerListLabelProp}) => {

    //REDUX FUNCTIONS
    const getValue = store.getState()[reducer].activeItem[reducerProp];

    //LOCAL STATES
    const [value,setValue] = useState('');
    useEffect(()=>{setValue(getValue);},[getValue]);
    
    //MAIN LOGIC

    const handleChange = (event) => {
        const newValue = event.target.value;
        store.dispatch(actions[reducer].updateActive({[reducerProp]:newValue}));
    }


    return (
       <TextField className='admin-details__input'
                    // error={(errors) && !(!errors[name])}
                    // helperText={(errors && errors[name]) ? errors[name] : '' }
                    // name = {name}
                    label={(label) ? label : ''} 
                    id="outlined-size-normal"
                    onChange = {handleChange} 
                    value={(value) ? value : '' } 
                    /> 
    )
                            };

export default React.memo(AdminDetailsInput);
