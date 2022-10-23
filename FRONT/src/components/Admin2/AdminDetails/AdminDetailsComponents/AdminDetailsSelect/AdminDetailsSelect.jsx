import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {actions} from '../../../../../store/reducers';
import { apiSlice } from '../../../../../store/api/apiSlice.js';
import './admindetailsselect.scss';
import {Select,MenuItem} from '@mui/material/';

const AdminDetailsSelect = ({
                            label,
                            reducer,
                            reducerValue,
                            reducerProp,
                            reducerList,
                            reducerListValueProp,
                            reducerListLabelProp}) => {

    //UTILITY FUNCTIONS
    const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    //REDUX FUNCTIONS
    //Get fresh list and store it in redux
    const apiList = apiSlice[`useGet${capitalize(reducerList)}Query`](); 
    const getValue = store.getState()[reducer].activeItem[reducerProp];

    //LOCAL STATES
    const [list,setList] = useState([]);
    useEffect(()=>{const {status} = apiList;
                    (status === 'fulfilled') &&  store.dispatch(actions[reducerList].handleFetch(apiList));
                    (status === 'fulfilled') && setList(apiList.data);}
              ,[apiList,reducerList]
            );

    const [value,setValue] = useState('');
    useEffect(()=>{setValue(getValue);},[getValue]);
    
    //MAIN LOGIC

    const handleChange = (event) => {
        const newValue = event.target.value;
        store.dispatch(actions[reducer].updateActive({[reducerProp]:newValue}));
        setValue(newValue);
    }

    return (
        <Select label   = {label}
                value   = {(value) ? value : ''}
                onChange= {handleChange}
                size    = 'small'
        >
            {list.map((item,index) => (
                <MenuItem   
                    key={`${reducerList}-item-${index}`}
                    value={item[reducerListValueProp]}
                >
                    {item[reducerListLabelProp]}
                </MenuItem>
            ))}
        </Select>
    )
                            };

export default React.memo(AdminDetailsSelect);
