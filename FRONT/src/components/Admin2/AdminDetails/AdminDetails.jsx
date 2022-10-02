import React, {useState,useEffect} from 'react';
import './admindetails.scss';
import store from '../../../store';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';
import { apiSlice } from '../../../store/api/apiSlice.js';
import CloseIcon from '@mui/icons-material/Close';
import {FormControlLabel,Checkbox,TextField,Button,Snackbar,Alert } from '@mui/material/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import frLocale from 'date-fns/locale/fr';
import { format } from 'date-fns';
//import Checkbox from '@mui/material/Checkbox';

const AdminDetails = ({schema,titleOverride,modeOverride,detailsDatagrids}) => {
    const { details } = useSelector(state => state);
    const setClose = ()=> store.dispatch(actions.details.setClose());
    const setContent = (data)=> store.dispatch(actions.details.setContent(data));
    apiSlice[`useGet${details.reducer}Query`]();                  //! Ask to Fetch data need to go in useState?

    const [mode,setMode] = useState((modeOverride) ? modeOverride : null);

    //Use only schema prop to update api (ex. : user doesn't update password)
    const updatedStuct = () => {
        const props = Object.keys (schema);
        const struct = props.reduce((prev,curr)=>{
            const filledProp = (details) ? details.content[curr] : null;
            return {...prev,...{[curr]:filledProp}}
        }
        ,{});
        return struct;
    }
    
    const [updated,setUpdated] = useState(updatedStuct());

    const [alert, setAlert] = useState(null);
    const [errors,setErrors] = useState(false);
    
    const [isSubmitable,setIsSubmitable] = useState(false);
    
    // eslint-disable-next-line no-unused-vars
    const [submit,res] = apiSlice[details.submitAction.actionName]();

    //Close details on schema change
    // useEffect(()=>{
    //     setClose();
    // },[schema]);


    const handleSubmit = () => {
        const routeParam = (details.submitAction.params) && details.submitAction.params.param;

        //SPECIAL CASE USER ID_ROLE boolean handled with int true = 2 false = 1;
        const updatedRoleBoolConv = (typeof(updated.id_role)==='boolean') ? (Number(updated.id_role) === 2) : null;  //Special case user roleHandle IntBoolean convertion
        const minimalPayload = (updatedRoleBoolConv === null) ? { body:updated } : {body:updated,role:updatedRoleBoolConv};


        console.log(minimalPayload);
        const payload = (routeParam) ? {...minimalPayload,param:routeParam} : minimalPayload;  //See apiSlice/index {body:{your data},opt. param:1 (param route)}
        ( isSubmitable && submit ) &&  submit( payload ).unwrap()
                                                        .then((payload) => {setAlert({severity:'success',message:'Succès'});
                                                                            setTimeout(()=>{setAlert();
                                                                                            //setClose();
                                                                                            },2500);
                                                                            setContent( payload );
                                                                            
                                                                            })
                                                        .catch((error) => { console.error('rejected', error);
                                                                            setAlert( {severity:'error'
                                                                                       ,message:`${error.status}: ${error.data.message}`});
                                                                            setTimeout(()=>{setAlert()},6000);
                                                                            });
    }
    const handleChange = (event) => {
        
        //Handling regular checkbok event
        const isCheckboxValue = (event.target.value === '@!ludo_checkbox') ? event.target.checked : null;
        //Handling int checkbok event 1 = false 2 = true currently only for user role (27/09/2022)
        const isIntCheckbox = (event.target.value === '@!ludo_checkbox_int')
        const IntCheckboxValue = (event.target.checked === true) ? 2 : 1;
        
        const checkBoxValue = (isIntCheckbox) ? IntCheckboxValue : isCheckboxValue;

        //Set new value
        const newValue = (checkBoxValue === null)                                                                 //Hack to identify checkbox cause value is in checked not in value
                          ? event.target.value
                          : checkBoxValue;

        setMode((mode !== 'new') ? 'edit' : mode);

        //Get update and insert current changement.
        console.log(updated);
        const syncUpdated = {...updated,[event.target.name]:newValue};

        //Check if all inputs are the same
        //!Strange comportment on users -> member number : return modified(true) after delete and rewrite same value
        const checkModified = (details && details.mode !== 'new') ?                                                                 //Avoid error if details empty
                                        !Object.entries(details.content).every(                                                     //Compare every Api data fields and search for a difference
                                            (entrie)=> Object.keys(syncUpdated).includes(entrie[0])                                 //Defensive : check if all api props exist in current state 
                                                       && entrie[1] === syncUpdated[entrie[0]]                                      //and check if value is different
                                        )
                                        : true;

        const currentErrors = Object.entries(syncUpdated).map((entrie)=>[entrie[0]                                                  // Array definition [api prop,
                                                            ,(schema[entrie[0]]) && (schema[entrie[0]].regex)                       // errorInfo or if error info doesn't exist 'invalid input' 
                                                                                    ? (!entrie[1].toString().match(schema[entrie[0]].regex))
                                                                                    : false 
                                                            ,entrie[1]]);

        const errorsWithText = currentErrors.map((error)=> [error[0],
                                                (!error[1]) ? error[1] : (schema[error[0]].errorInfo) 
                                                                            ? schema[error[0]].errorInfo 
                                                                            : 'Saisie Incorrecte'
                                                ,error[2]]);     

        const checkConform = (currentErrors) && currentErrors.every((entrie)=> (!entrie[1]) );                                                   //Check if there is no error
        
        setErrors((!checkConform) && errorsWithText.reduce((prev,curr)=>{return { ...prev, ...{[`${curr[0]}`]:curr[1]} } },{}));             //Go back from Entries (array) to object
        setIsSubmitable((checkModified && checkConform));                                                                                   //Set is conform (= conform to submit)
        setUpdated({...syncUpdated});
    }

    useEffect(()=>{(details) && setUpdated(details.content); 
                    setIsSubmitable(false);
                    setUpdated(updatedStuct());
                  },[details]);

    //DYNAMIC TITLE (Default)
    //Use title prop in schema definition and detail content value to make a dynamic title
    //Else show standard 'Details' string
    //Can be override by titleOverride props

    //Structure construction 
    const titleStruct = (schema) && Object.entries(schema)                                                                          // ['schema_prop = api data key',order_number]
                                        .filter(prop => prop[1].title)                                                              //Keep only props used to set title
                                        .sort((a,b)=>{return a[1].title - b[1].title})                                              //Sort by title order from small to big
                                        .map(titleElt => titleElt[0]);                                                              //get props ordered Result : Ex. : [title1,title2]
    
    // Use structure to replace with api data
    const dynaTitle = (details.content) ? titleStruct.map(elt => `${(schema[elt].titlePrefix)                                       //For each key filled in schema : Concat string type titlePrefix + TitleContent
                                                                     ? schema[elt].titlePrefix                                      //Concat prefix if exist
                                                                     : ''}
                                                                   ${details.content[elt]}`)                                        //Use api data to show title
                                                      .join(' ')
                                        : 'Détails';

    //DYNAMIC FIELDS
    const blocNumb = (schema) && [...new Set(Object.entries(schema)                                                                 //...new Set naturaly avoid duplicate values
                                         .map((elt)=> [elt[1].bloc,elt[1].blocTitle,elt[1].field])                                  //ex. : [indexBloc,titleBloc,fieldInput]
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
    //console.log(blocNumb);
    
    //DYNAMIC INPUT
    const inputType = (type,label,value,name) => {
        // console.log(type,label,value,name);
        const types = {
            checkbox    : () => {
                                return (<FormControlLabel className='admin-details__input--checkbox admin-details__input '
                                                name = {name}
                                                key = {name}
                                                label={(label) ? label : ''} 
                                                //onChange = {(event)=>{console.log(event.target)}}
                                                control={<Checkbox name = {name}
                                                                   value = '@!ludo_checkbox' 
                                                                   checked={(value) && value}   //Always send something or mui throw error
                                                                   onChange = {handleChange}
                                                                   inputProps={{ 'aria-label': 'controlled' }}
                                                                   />
                                                        } 
                                />)},
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
                                                                   onChange = {handleChange}
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
                                            onChange = {(event) => (event) && (event.toString() !== 'Invalid Date' && event) ? handleChange({target:{name,value:format(event, 'yyyy-MM-dd')}}) : console.log(event)} 
                                            // onChange = {(event) => (event) && (event.toString() !== 'Invalid Date' && event) ? console.log(true,typeof(event)) : console.log(false,event)} 
                                            //onChange={(event) => handleChangeDate(event)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>)},
            input       : () => (<TextField className='admin-details__input'
                                            error={(errors) && !(!errors[name])}
                                            helperText={(errors && errors[name]) ? errors[name] : '' }
                                            name = {name}
                                            key = {name}
                                            label={(label) ? label : ''} 
                                            id="outlined-size-normal"
                                            onChange = {handleChange} 
                                            value={(value) ? value : '' } />),
            datagrid : () =>{//AdminDatagrid render or DefailsDatagrid?);
                                console.log('Datagrid render test');
            },
        }

        return (types[type]) ? types[type](label,value) : types.input(label,value)
    }



    return (
        <div className={`admin-details ${(details.open)?'admin-details__open':'admin-details__close'}`}>

            {/* HEADER */}
            <div className={`admin-details__header  ${(details.open)?'admin-details__header--open':'admin-details__header--close'}`}> 
                <div  className='admin-details__header-button--close admin-details__header-button' onClick={setClose}>
                    <CloseIcon className='admin-details__header-button--close-icon'/>
                </div>
                <div className='admin-details__title'>{(titleOverride) ? titleOverride : dynaTitle}</div>
                <Button disabled={(!isSubmitable)} onClick={handleSubmit} className='admin-details__header-button' variant="contained">Valider</Button>
            </div>

            {/* BLOCS */}
                <div className={`admin-details__bloc-container ${(details.open)?'admin-details__bloc-container--open':'admin-details__bloc-container--close'}`} >
                    {blocNumb.map((bloc)=>{
                        return(
                            <div className='admin-details__bloc' key={`bloc__${bloc[0]}`}>

                                <div className='admin-details__bloc--title'> {bloc[1]}</div>

                                <div className='admin-details__bloc--inputs'>

            {/* INPUTS */}
                                    {Object.entries(schema).filter((input) => input[1].bloc === bloc[0] && input[1].inputDisplay !== 'none')     //
                                                            .sort((a,b)=>{ return a[1].field - b[1].field })                                     //Sort inputs by field
                                                            .map((input)=>{
                                                                // console.log(input);
                                                                return inputType(input[1].inputDisplay,
                                                                                 input[1].label,
                                                                                 (!mode) ? details.content[input[0]] : updated[input[0]],           //Mode is not set : display api infos else inputs are modified or new :display local info
                                                                                input[0]);
                                                                }

                                    )}
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
