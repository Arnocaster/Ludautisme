import React, {useState,useEffect} from 'react';
import store from '../../../../../store';
import {useSelector} from 'react-redux';
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

    const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    const { details } = useSelector(state => state);
    const setDetailContent = (data)=> store.dispatch(actions.details.setContent(data));
    
    const [list,setList] = useState([]);
    const apiList = apiSlice[`useGet${capitalize(reducerList)}Query`](); 
    const fetchList = () => {
        store.dispatch(actions[reducerList.toLowerCase()].handleFetch(apiList));
        const getList = store.getState()[reducerList][reducerList];
        const idsList = list.map((item) => item[reducerListValueProp]);
        const cleanedList = getList.filter((item)=> idsList.includes(item[reducerListValueProp]));
        setList(cleanedList);
    }
    
     const [openAutocomplete,setOpenAutocomplete] = useState(false);

    const handleOpenAutocomplete = () => setOpenAutocomplete(true);

     const [value, setValue] = React.useState('');
     const [inputValue, setInputValue] = React.useState('');

    const [newChip,setNewChip] = useState({});

    const handleRemove = (e) => {
        // const dataAttr = e.currentTarget.closest('div').dataset.remove.split("-");              // ex. : ['tag','1']
        // const type = dataAttr[0];                                                               // = name ex. 'tag'
        // const dataId = (Number.isNaN(dataAttr[1])) ? dataAttr[1] : Number(dataAttr[1]);         // = value ex. 1
        // const cloned = [...updated[name]];
        // const removed = cloned.filter((elt) => elt[inputArrayValue] !== dataId)                 //inputArrayValue = prop name who get value ex. for tag : 'id' 
        //handleChange({target:{name:type,value:removed}});
    }

    //Chip exists in list
    const handleAddChip = (newValue) => {
        const itemFound = list.find((item)=> item[reducerListLabelProp] === newValue);
        const itemCleaned = {[reducerListValueProp]:itemFound[reducerListValueProp],
                             [reducerListLabelProp]:itemFound[reducerListLabelProp]};
        const itemFusion = [...details.content[reducerProp],...[itemCleaned]];
        const updatedDetails = {...details.content, [reducerProp]:itemFusion};
        setDetailContent(updatedDetails);

    }

    useEffect(()=>{fetchList()},[])

    return (
        <div className='admin-details__chip--container'>                                
            {/* {(value) && value.map((val,index) => (
                            <Chip   className='admin-details__chip--item'
                                    key={`${name}-${index}`} 
                                    data-remove={`${name}-${val[inputArrayValue]}`}
                                    label={val[inputArrayProp]}
                                    variant="outlined" 
                                    onDelete={handleRemove}
                            />)
            )} */}
            {(!openAutocomplete) && <Button onClick={handleOpenAutocomplete}><AddCircleIcon/></Button>}
            {(openAutocomplete && list.length) 
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
                        options={list.map((item)=> item[reducerListLabelProp])}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label={reducerList} />}
                    />              
            }
        </div>

    )
};

export default React.memo(AdminDetailsChipContainer);
