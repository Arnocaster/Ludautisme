import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {actions} from '../../../../../store/reducers';
import './admindetailscheckbox.scss';
import {Checkbox,FormControlLabel} from '@mui/material/';

const AdminDetailsCheckbox = ({reducer,
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

    // const [error,setError] = useState(false);
    // const [errorInfo] = useState((schema[reducerProp].errorInfo) 
    //                                 ? schema[reducerProp].errorInfo 
    //                                 : 'La saisie est invalide')

    
    //MAIN LOGIC
    const handleChange = (event) => {
        //Handle Regex Error
        // const regex = schema[reducerProp].regex;
        // const isError = (regex) && (!event.target.value.match(regex));
        // setError(isError);
        // (isError) && store.dispatch(actions[reducer].updateError({[reducerProp]:event.target.value}));
        // (getErrors[reducerProp] && !isError) && store.dispatch(actions[reducer].removeError({[reducerProp]:event.target.value}));
        //Update value
        store.dispatch(actions[reducer].updateActive({[reducerProp]:!value}));
        setValue(!value);
    }


    return (
        <FormControlLabel   className='admin-details__input--checkbox admin-details__input '
                            label={(label) ? label : ''} 
                            onChange = {handleChange}
                            control = {<Checkbox
                                        value = '@!ludo_checkbox' 
                                        checked={(value) ? value : false}   //Always send something or mui throw error
                                        //onChange = {handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />}
        />
    )
                            };

export default React.memo(AdminDetailsCheckbox);
