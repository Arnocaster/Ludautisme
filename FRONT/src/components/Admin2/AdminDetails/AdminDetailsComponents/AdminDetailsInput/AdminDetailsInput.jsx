import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {actions} from '../../../../../store/reducers';
import './admindetailsinput.scss';
import {TextField} from '@mui/material/';

const AdminDetailsInput = ({reducer,
                            label,
                            schema,
                            reducerValue,
                            reducerProp,
                            reducerList,
                            reducerListValueProp,
                            reducerListLabelProp}) => {

    //REDUX FUNCTIONS
    const getValue = store.getState()[reducer].activeItem[reducerProp];
    const getErrors = store.getState()[reducer].activeErrors;

    //LOCAL STATES
    const [value,setValue] = useState('');
    useEffect(()=>{setValue(getValue);},[getValue]);

    const [error,setError] = useState(false);
    const [errorInfo] = useState((schema[reducerProp].errorInfo) ? schema[reducerProp].errorInfo : 'La saisie est invalide')

    
    //MAIN LOGIC
    const handleChange = (event) => {
        //Handle Regex Error
        const regex = schema[reducerProp].regex;
        const isError = (regex) && (!event.target.value.match(regex));
        setError(isError);
        (isError) && store.dispatch(actions[reducer].updateError({[reducerProp]:event.target.value}));
        (getErrors[reducerProp] && !isError) && store.dispatch(actions[reducer].removeError({[reducerProp]:event.target.value}));
        //Update value
        store.dispatch(actions[reducer].updateActive({[reducerProp]:event.target.value}));
        setValue(event.target.value);
    }


    return (
       <TextField className='admin-details__input'
                    error={error}
                    helperText={(error) ? errorInfo : '' }
                    // name = {name}
                    label={(label) ? label : ''} 
                    id="outlined-size-normal"
                    onChange = {handleChange} 
                    value={(value) ? value : '' } 
                    size='small'
                    /> 
    )
                            };

export default React.memo(AdminDetailsInput);
