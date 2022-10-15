import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {actions} from '../../../../../store/reducers';
import { apiSlice } from '../../../../../store/api/apiSlice.js';
import './admindetailschipcontainer.scss';
import {Button,Chip,TextField,Autocomplete} from '@mui/material/';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AdminDetailsChipContainer = ({reducer,
                                    reducerValue,
                                    reducerProp,
                                    reducerList,
                                    reducerListValueProp,
                                    reducerListLabelProp}) => {

    //UTILITY FUNCTIONS
    const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    const getCleanedList = () => {
        const fullList = [...getList];
        const alreadyExist = reducerValue.map((prop) => prop[reducerListValueProp]);                        //Get element already displayed
        const cleanedList = fullList.filter((prop)=> !alreadyExist.includes(prop[reducerListValueProp]));   //Remove existing element from list
        return (cleanedList) ? cleanedList : [];
    }

    //REDUX FUNCTIONS
                        
    //Get fresh list and store it in redux
    const apiList = apiSlice[`useGet${capitalize(reducerList)}Query`](); 
    store.dispatch(actions[reducerList.toLowerCase()].handleFetch(apiList));
    
    const getItems= store.getState()[reducer].activeItem[reducerProp];
    const getList = store.getState()[reducerList].allItems;

    //AUTOCOMPLETE FIELD
     const [openAutocomplete,setOpenAutocomplete] = useState(false);
     const handleOpenAutocomplete = () => setOpenAutocomplete(true);

     const [value, setValue] = React.useState('');
     const [inputValue, setInputValue] = React.useState('');

     //TO BE IMPLEMENTED
    const [newChip,setNewChip] = useState({});
    
    //MAIN LOGIC
    const handleRemove = (e) => {
        const dataAttr = e.currentTarget.closest('div').dataset.remove.split("-");                  // ex. : ['tag','1']
        const dataId = (Number.isNaN(dataAttr[1])) ? dataAttr[1] : Number(dataAttr[1]);             // = input value ex. 1
        const cloned = [...getItems];
        const removed = cloned.filter((elt) => elt[reducerListValueProp] !== dataId)                 //reducerListValueProp = prop name who get value ex. for tag : 'id' 
        store.dispatch(actions[reducer].updateActive({[reducerProp]:removed}));
    }

    //Add an existing chip
    const handleAddChip = (newValue) => {
        const cloned = [...getItems];                                                               //Actual item list
        const itemFound = getCleanedList().find((item)=> item[reducerListLabelProp] === newValue); //Find complete item in list (with label)
        const itemCleaned = {[reducerListValueProp]:itemFound[reducerListValueProp],               //Make a clean item object (clean unused props)
                              [reducerListLabelProp]:itemFound[reducerListLabelProp]};             
        const itemFusion = [...cloned,itemCleaned];                                                 //Make an updated array with new item
        store.dispatch(actions[reducer].updateActive({[reducerProp]:itemFusion}));                  //Send it to the store
        setValue('');                                                                               //Clear autocomplete
        setInputValue('');                                                                          //Clear autocomplete
    }

    useEffect(()=>{setOpenAutocomplete(false)},[reducerValue]);   //Close autocomplete field on reference switch if selection not validated

    return (
        <div className='admin-details__chip--container'>                                
            {(getItems) && getItems.map((val,index) => (
                            <Chip   className='admin-details__chip--item'
                                    key={`${reducerProp}-${index}`} 
                                    data-remove={`${reducerProp}-${val[reducerListValueProp]}`}
                                    label={val[reducerListLabelProp]}
                                    variant="outlined" 
                                    onDelete={handleRemove}
                            />)
            )}
            {(!openAutocomplete) && <Button onClick={handleOpenAutocomplete}><AddCircleIcon/></Button>}
            {(openAutocomplete) 
                &&  <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            handleAddChip(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        options={getCleanedList().map((item)=> item[reducerListLabelProp])}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label={reducerList} />}
                    />              
            }
        </div>

    )
};

export default React.memo(AdminDetailsChipContainer);
