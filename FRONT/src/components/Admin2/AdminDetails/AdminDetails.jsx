import React, {useState,useEffect} from 'react';
import './admindetails.scss';
import store from '../../../store';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';
import { apiSlice } from '../../../store/api/apiSlice.js';
import CloseIcon from '@mui/icons-material/Close';
import {FormControlLabel,Checkbox,TextField,Button,Snackbar,Alert,Select,MenuItem,Chip } from '@mui/material/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import frLocale from 'date-fns/locale/fr';
import { format } from 'date-fns';
import AdminDetailsChipContainer from './AdminDetailsComponents/AdminDetailsChipContainer/AdminDetailsChipContainer';
import AdminDetailsInput from './AdminDetailsComponents/AdminDetailsInput/AdminDetailsInput';
import AdminDetailsTextArea from './AdminDetailsComponents/AdminDetailsTextArea/AdminDetailsTextArea';
import AdminDetailsSelect from './AdminDetailsComponents/AdminDetailsSelect/AdminDetailsSelect';
import AdminDetailsCheckbox from './AdminDetailsComponents/AdminDetailsCheckbox/AdminDetailsCheckbox';
import AdminDatagrid from '../AdminDatagrid/AdminDatagrid';
import AdminButtonAdd from '../AdminReusableComponents/AdminButtonAdd/AdminButtonAdd';
//import { referenceSchema } from '../../../Schemas';
import schemas from '../../../Schemas';
//import Checkbox from '@mui/material/Checkbox';


const AdminDetails = ({schema,reducer,titleOverride,modeOverride,detailsDatagrids,level}) => {

    //UTILITY FUNCTIONS

    const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    //Return true if two object are perfectly identical
    const deepComparison = (first, second) => {

        /* Checking if the types and values of the two arguments are the same. */
        if(first === second) return true

        /* Checking if any arguments are null */
        if(first === null || second === null) return false

        /* Checking if any argument is none object */
        if(typeof first !== 'object'  || typeof second !== 'object') return false

        /* Using Object.getOwnPropertyNames() method to return the list of the objects’ properties */
        let first_keys = Object.getOwnPropertyNames(first);
        let second_keys = Object.getOwnPropertyNames(second);

        /* Checking if the objects' length are same*/
        if(first_keys.length !== second_keys.length) return false;

        /* Iterating through all the properties of the first object with the for of method*/
        for(let key of first_keys) {
            /* Making sure that every property in the first object also exists in second object. */ 
            if(!Object.hasOwn(second, key)) return false
            /* Using the deepComparison function recursively (calling itself) and passing the values of each property into it to check if they are equal. */
            if (deepComparison(first[key], second[key]) === false) return false
        }
        /* if no case matches, returning true */ 
        return true
    }

    const getSubmitActionString = () => {
        const capitalizedReducer = capitalize(reducer);
        const newItem       = (details[level].mode === 'new') && `useAdd${capitalizedReducer}Mutation`;
        const removeItem    = (!newItem && modeOverride === 'remove') && `useRemove${capitalizedReducer}Mutation`;
        const updateItem    = (!removeItem) && `useUpdate${capitalizedReducer}Mutation`;
        return (newItem)    ?   newItem     :   (removeItem)    ? removeItem    :   updateItem;
    }

    //REDUX FUNCTIONS 
    const { details }   = useSelector(state => state);
    const getListItems  = store.getState()[reducer].allItems;
    const getActiveItem = store.getState()[reducer].activeItem;
    const getErrors     = store.getState()[reducer].activeErrors;

    
    const clearActiveItem   = ()=> store.dispatch(actions[reducer].clearActiveItem());
    const refetchItems      = apiSlice[`useGet${capitalize(reducer)}Query`]().refetch;
    const setClose          = ()=> store.dispatch(actions.details.setClose(level));

    //LOCAL STATES

    const [currActiveItem,setCurrActiveItem] = useState({});
    useEffect(()=>{ 
        (getActiveItem[pK] !== currActiveItem[pK]) 
            ? setSubmitable(false) 
            : checkIsSubmitable();
        setCurrActiveItem({...getActiveItem});
    },[getActiveItem]);

    useEffect(()=>{
        (details.mode === 'new') && clearActiveItem();
        (details.mode === 'new') && setCurrActiveItem({});
        setSubmitString(getSubmitActionString());
        // console.log((details.mode === 'new'),currActiveItem);
    },[details])

    const [currListItems,setCurrListItems] = useState([...getListItems]);
    //useEffect(()=>{setCurrListItems([...getListItems]);},[getListItems]);

    //SCHEMA 
    const [currSchema,setCurrSchema] = useState(schemas[schema]);
    const [pK,setPK] = useState(schemas[schema]);

    useEffect(()=>{
        setCurrSchema(schemas[schema]);
        const pkEntr = Object.entries(schemas[schema]).filter((prop)=>(prop[1].primaryKey));
        (pkEntr) && setPK(pkEntr[0][0]);
    },[schema]);

    //SUBMIT
    const [submitString,setSubmitString] = useState(getSubmitActionString());
    const [submit] = apiSlice[submitString]();
    const [submitable,setSubmitable] = useState(false);

    //ALERT FEEDBACK
    const [alert, setAlert] = useState(null);

    //MAIN LOGIC

    const checkIsSubmitable = () => {
        const newer = {...getActiveItem};
        const current = currListItems.find((item)=>newer[pK] === item[pK]);
        const errors = Object.keys(getErrors).length > 0; 
        const isSubmitable = (!deepComparison(current,newer) && !errors);
        (submitable !== isSubmitable) && setSubmitable(isSubmitable);
    }
    const handleSubmit = () => {
        const routeParam = (details.mode !== 'new') && getActiveItem[pK];
        const cleanedPayloadData = Object.entries(getActiveItem)
                                  .filter((entrie)=>{
                                    const isDisplayed = (currSchema[entrie[0]]) &&  ((currSchema[entrie[0]].inputDisplay !== 'none') || currSchema[entrie[0]].forceApiUsage); 
                                    console.log(entrie,(currSchema[entrie[0]]) , (currSchema[entrie[0]].inputDisplay !== 'none'))
                                    return entrie[0] !== pK && isDisplayed;
                                    });
        const payloadData = Object.fromEntries(cleanedPayloadData);
        const fullPayload = (routeParam) ? {body:payloadData,param:routeParam} : {body:payloadData};
        //console.log(getActiveItem,cleanedPayloadData,payloadData,fullPayload);
        (submitable) && submit(fullPayload).unwrap()
                                            .then((payload) => {setAlert({severity:'success',message:'Succès'});
                                                                setTimeout(()=>{setAlert();
                                                                                //setClose();
                                                                                },2500);
                                                                refetchItems();
                                                                setSubmitable(false);
                                                                //.setCurrActiveItem( payload );
                                                                
                                                                })
                                            .catch((error) => { console.error('rejected', error);
                                                                setAlert( {severity:'error'
                                                                            ,message:`${error.status}: ${error.data.message}`});
                                                                setTimeout(()=>{setAlert()},6000);
                                                                });
    }

    //DYNAMIC TITLE (Default)
    //Use title prop in sche definition and detail content value to make a dynamic title
    //Else show standard 'Details' string
    //Can be override by titleOverride props

    //Structure construction 
    const titleStruct = (currSchema) && Object.entries(currSchema)                                                                          // ['sche_prop = api data key',order_number]
                                        .filter(prop => prop[1].title)                                                              //Keep only props used to set title
                                        .sort((a,b)=>{return a[1].title - b[1].title})                                              //Sort by title order from small to big
                                        .map(titleElt => titleElt[0]);                                                              //get props ordered Result : Ex. : [title1,title2]
    
    // Use structure to replace with api data
    //console.log(titleStruct && currActiveItem);
    const dynaTitle = (titleStruct && currActiveItem) ? titleStruct.map(elt => `${(currSchema[elt].titlePrefix)                                       //For each key filled in sche : Concat string type titlePrefix + TitleContent
                                                                     ? currSchema[elt].titlePrefix                                      //Concat prefix if exist
                                                                     : ''}
                                                                   ${currActiveItem[elt]}`)                                        //Use api data to show title
                                                      .join(' ')
                                        : 'Détails';

    //DYNAMIC FIELDS
    const blocNumb = (currSchema) && [...new Set(Object.entries(currSchema)                                                                 //...new Set naturaly avoid duplicate values
                                         .map((elt)=> [elt[1].bloc,elt[1].blocTitle,elt[1].field,elt[1].blocAddButton,elt[1].reducer,elt[1].linkedProp])                             //ex. : [indexBloc,titleBloc,fieldInput]
                                         .reduce((prev,curr)=>{
                                            const iExist = prev.findIndex((elt)=> elt[0] === curr[0]);                              //Check if another bloc is similar
                                            const updateBloc = (iExist >= 0) && ((                                                  //If there is another bloc
                                                                                      !prev[iExist][1] && curr[1])                  //If title doesn't exist in previous bloc, this one win 
                                                                                    ||(curr[1] && curr[2] < prev[iExist][2])        //If title exist in both : bloc with minimum field value win
                                                                                ) && curr;                                          //One of two case up match : current bloc erase old bloc
                                            prev[iExist] = (updateBloc) ? updateBloc : prev[iExist];                                //! MUTATION : Update if needed (see up), else do nothing 
                                            return (iExist < 0) ? [...prev,curr] : prev;                                            // If index < 0 it's a new bloc, add it, else return the mutated prev
                                        },[])   //get bloc number
                                         .sort((a,b)=> {return (!a[0] || !b[0]) ? -1 : a[0] - b[0]})                                //order by bloc number from small to big AND undefined at the end
                                    )];                                                                                             //Result [[1(blocnum),'title1',1(field)],2,3,etc...,[undefined,undefined,undefined]
    // console.log(blocNumb);
    //DYNAMIC INPUT
    const inputType = (type,label,value,name,apiList,apiListValueProp,apiListLabelProp) => {
        //(type === 'datagrid') && console.log(type,label,value,name);  //Debug only
        const types = {
            select : () => ( 
                <AdminDetailsSelect
                    key                     = {name}
                    label                   = {label}
                    reducer                 = {reducer}
                    reducerValue            = {value}
                    reducerProp             = {name}
                    reducerList             = {apiList}
                    reducerListValueProp    = {apiListValueProp}
                    reducerListLabelProp    = {apiListLabelProp}

                />),
            checkbox    : () => ( <AdminDetailsCheckbox
                    key                     = {name}
                    label                   = {label}
                    reducer                 = {reducer}
                    reducerValue            = {value}
                    reducerProp             = {name}
                    reducerList             = {apiList}
                    reducerListValueProp    = {apiListValueProp}
                    reducerListLabelProp    = {apiListLabelProp}

                />),
            //Special User role case : true = 2 // false = 1 Why: today there are only two roles but db model handle 2+ case.
            //Will Transform to a list when more than 2 case.
            intCheckbox    : () => {
                                const cleanedValue = (Number(value)===2)?true:false;            
                                return (<FormControlLabel className='admin-details__input--checkbox admin-details__input '
                                                name = {name}
                                                key = {name}
                                                label={(label) ? label : ''} 
                                                //onChange = {(event)=>{console.log(event.target)}}
                                                control={<Checkbox name = {name}
                                                                   value = '@!ludo_checkbox_int' 
                                                                   checked={(cleanedValue)&&(cleanedValue)} //Always send something or mui throw error
                                                                   //onChange = {handleChange}
                                                                   inputProps={{ 'aria-label': 'controlled' }}
                                                                   />
                                                        } 
                                />)},
            date        : () => {
                                return (
                                    <LocalizationProvider key = {`localization-provider__${name}`} 
                                                       dateAdapter={AdapterDateFns} 
                                                       locale={frLocale}>
                                        <DatePicker
                                            className='admin-details__input'
                                            name = {name}
                                            label={(label) ? label : ''}
                                            value={value}
                                            //onChange = {(event) => (event) && (event.toString() !== 'Invalid Date' && event) ? handleChange({target:{name,value:format(event, 'yyyy-MM-dd')}}) : console.log(event)} 
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>)},
            textArea    : () => (
                <AdminDetailsTextArea
                    key                     = {name}
                    label                   = {label}
                    reducer                 = {reducer}
                    reducerValue            = {value}
                    reducerProp             = {name}
                    reducerList             = {apiList}
                    reducerListValueProp    = {apiListValueProp}
                    reducerListLabelProp    = {apiListLabelProp}

                />
                                            ),
            input       : () => (
                <AdminDetailsInput
                    key                     = {name}
                    label                   = {label}
                    schema                  = {currSchema}
                    reducer                 = {reducer}
                    reducerValue            = {value}
                    reducerProp             = {name}
                />
            ),
            chipList    : () => (
                <AdminDetailsChipContainer
                    key                     = {name}
                    label                   = {label}
                    reducer                 = {reducer}
                    reducerValue            = {value}
                    reducerProp             = {name}
                    reducerList             = {apiList}
                    reducerListValueProp    = {apiListValueProp}
                    reducerListLabelProp    = {apiListLabelProp}

                />
                               
            ),
            imageGallery : () => {//AdminImageGallery render );
                                console.log('ImageGallery render test');
            },
            datagrid    : () =>{//AdminDatagrid render or DefailsDatagrid?);
                console.log(currSchema[name].filterProp,name);
                (Array.isArray(currActiveItem[name])) 
                    ? console.log(currActiveItem[name].map((item)=>item[currSchema[name].filterProp]))
                    :  console.log(currActiveItem[name]);
                return(
                <AdminDatagrid
                    key                     = {name}   
                    schema                  = {currSchema[name].schema}
                    level                   = 'secondary'
                    reducer                 = {currSchema[name].reducer}
                    filterLinkProp          = {currSchema[name].filterProp}
                    filterOriginReducer     = {currSchema[name].filterOriginReducer}
                    filterLinkValue         = {currActiveItem[currSchema[name].filterValue]}
                    toolbar                 = {currSchema[name].toolbar}
                    hideFooter              = {currSchema[name].hideFooter}
                />)
            },
        }

        return (types[type]) ? types[type]() : types.input()
    }



    return (
        <div className={`admin-details ${(level === 'primary') ? details.primary.open : details.secondary.open}'admin-details__open':'admin-details__close'}`}>

            {/* HEADER */}
            <div className={`admin-details__header  ${((level === 'primary') ? details.primary.open : details.secondary.open)?'admin-details__header--open':'admin-details__header--close'}`}> 
                <div  className='admin-details__header-button--close admin-details__header-button' onClick={setClose}>
                    <CloseIcon className='admin-details__header-button--close-icon'/>
                </div>
                <div className='admin-details__title'>{(titleOverride) ? titleOverride : dynaTitle}</div>
                <Button disabled={(!submitable)} onClick={handleSubmit} className='admin-details__header-button' variant="contained">Valider</Button>
            </div>

            {/* BLOCS */}
                <div className={`admin-details__bloc-container ${((level === 'primary') ? details.primary.open : details.secondary.open)?'admin-details__bloc-container--open':'admin-details__bloc-container--close'}`} >
                    {blocNumb.map((bloc)=>{
                        return(
                            <div className='admin-details__bloc' key={`bloc__${bloc[0]}`}>

                                <div className='admin-details__bloc--title'> 
                                    <span>{bloc[1]}</span>
                                    {(bloc[3]) && 
                                        <AdminButtonAdd type  ='icon'
                                                        level = 'secondary'
                                                        reducer = {bloc[4]}
                                                        linkedProp = {{[bloc[5]]:currActiveItem[pK]}}/>
                                    }
                                    
                                </div>


                                <div className='admin-details__bloc--inputs'>

            {/* INPUTS */}
                                    {[...Object.entries(currSchema).filter((input) => input[1].bloc === bloc[0] && input[1].inputDisplay !== 'none')     //
                                                            .sort((a,b)=>{ return a[1].field - b[1].field })                                     //Sort inputs by field
                                                            .map((input) => {
                                                                return inputType(input[1].inputDisplay,
                                                                                 input[1].label,
                                                                                 currActiveItem[input[0]],           //Mode is not set : display api infos else inputs are modified or new :display local info
                                                                                input[0],
                                                                                input[1].apiList,
                                                                                input[1].apiListValueProp,
                                                                                input[1].apiListLabelProp
                                                                                );
                                                                }

                                    )]}
                                </div>

                            </div>)}
                    )}   
                </div>
            {/* SNACKBAR */}
            {(alert) && 
                <Snackbar   open={!(!alert)} 
                            autoHideDuration={6000} 
                            onClose={()=>{setAlert()}}
                             anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Alert onClose={()=>{setAlert()}} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            }   
        </div>
    )
}

export default React.memo(AdminDetails);
