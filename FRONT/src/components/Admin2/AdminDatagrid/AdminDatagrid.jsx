import React, { useState, useEffect,useRef } from 'react';
import './admindatagrid.scss';
import store from '../../../store';
import schemas from '../../../Schemas';
import details from '../../../store/features/Admin/Details';
import {actions} from '../../../store/reducers';
import { ToggleButton, IconButton  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridToolbar, frFR, GridCheckIcon } from '@mui/x-data-grid';
import { apiSlice } from '../../../store/api/apiSlice';

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

const AdminDatagrid = ({
    schema,
    submitAction,
    reducer,
    defaultSortBy,
    filterLinkProp,
    filterLinkValue,
    filterOriginReducer,
    level,
    toolbar,
    hideFooter,
}) => {

    
    //Utility function
    const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    // RESPONSIVE DATAGRID HEIGHT
    const [height, setHeight] = useState(null);
    const [clientHeight,setClientHeight] = useState(window.innerHeight);
    const parentSize = useRef();

    //Help to filter too many renderer, without, rendering each ms you are resising who makes brower bug.
    const debouncedHandleResize = debounce(() => {
        const delta = (window.innerHeight < clientHeight ) ?  clientHeight - window.innerHeight : 0;
        setClientHeight(window.innerHeight);
        //console.log(parentSize.current.getBoundingClientRect().height,parentSize)
        setHeight(parentSize.current.getBoundingClientRect().height - delta);
    }, 16);

    useEffect(() => {
        debouncedHandleResize();
        window.addEventListener('resize', debouncedHandleResize);
        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientHeight]);
    // END RESPONSIVE DATAGRID HEIGHT

    //MAIN LOGIC

    const [currReducer,setCurrReducer] = useState(reducer);
    useEffect(()=>{setCurrReducer(reducer)},[reducer]);

    const getState = store.getState()[currReducer];
    
    //FetchData
    const apiSliceQuery = `useGet${capitalize(currReducer)}Query`;
    const apiQuery = apiSlice[apiSliceQuery](); //Mandatory on top-level for useEffect usage
    //console.log(apiQuery);
    //Put data in local reducer
    //store.dispatch(actions[reducer].handleFetch(apiQuery));
    const [currSchema,setCurrSchema] = useState({});
    const [columns,setColumns] = useState(['id']);  //Allow datagrid render even without values
    const [visibleCols,setVisibleCols] = useState(['id']);  //Allow datagrid render even without values

    useEffect(()=>{
        setCurrSchema({...schemas[schema]});
    },[schema]);

    const quantityOnlyOperators = [
    {
            label: 'includes',
            value: 'includes',
            getApplyFilterFn: (filterItem) => {
            const arrValue = (!Array.isArray(filterItem.value))?[filterItem.value]:filterItem.value;
            return ({ value }) => {
                    (arrValue.includes(value)) && console.log(arrValue,value);
                    return (arrValue.includes(value));
                };
            },
            //InputComponent: InputNumberInterval,
        },
    ];

    useEffect(()=>{
        const cols = Object.keys(currSchema).map((field) => {
            return {
                type : currSchema[field].type,
                field : field,
                headerName: currSchema[field].label,
                width : currSchema[field].width,
                renderCell : customCellBuilder[currSchema[field].gridDisplay] || '',
                filterOperators: (filterLinkProp === field) && quantityOnlyOperators,
            }
        });
        const visColEntries = Object.entries(currSchema).map((entrie)=> [entrie[0], entrie[1].gridDisplay!=='none']);
        setVisibleCols(Object.fromEntries(visColEntries));
        setColumns([...cols]);
    },[currSchema]);



    const [rows,setRows] = useState([]);

    useEffect(()=>{
                    const {status} = apiQuery;
                    (status === 'fulfilled') &&  store.dispatch(actions[currReducer].handleFetch(apiQuery));
                    (status === 'fulfilled') && setRows([...apiQuery.data]);              
    },[apiQuery,currReducer]);

    //TOOLBAR
    const [useToolbar,setUseToolbar] = useState();
    useEffect(()=> {
        const toolBarObject = (toolbar === false) 
                                ?  null
                                : {Toolbar: GridToolbar,};
        setUseToolbar(toolBarObject);
    },[toolbar]);

    //TOOLBAR
    const [disableFooter,setDisableFooter] = useState(false);
    useEffect(()=> {
        setDisableFooter(hideFooter);
    },[hideFooter]);

    //SORT ROWS
    const [initialState,setInitialState] = useState({});
    const [currDefaultSortBy,setCurrDefaultSortBy] = useState();

    useEffect(()=>{
        (defaultSortBy) && setCurrDefaultSortBy({...defaultSortBy});
    },[defaultSortBy]);

    //FILTER ROWS
    const [currFilterProp,setCurrFilterProp] = useState();
    const [currFilterValue,setCurrFilterValue] = useState();
    const [currfilterOriginReducer,setCurrfilterOriginReducer]  = useState();
    const [filterModel,setFilterModel] = useState();

    useEffect(()=>{
        if (filterLinkProp && filterLinkValue && filterOriginReducer) {
            (currFilterProp !== filterLinkProp) && setCurrFilterProp(filterLinkProp);      //ex. : ref_id
            (currfilterOriginReducer !== filterOriginReducer) &&setCurrfilterOriginReducer(filterOriginReducer);
            (currFilterValue !== filterLinkValue) && setCurrFilterValue(filterLinkValue);    //ex. : 'id' from this reducer
        }
    },[filterLinkProp,filterLinkValue,filterOriginReducer]);

    const buildFilterObject = () => {
        const filterObject = {items : [ {columnField:currFilterProp
                                         ,operatorValue:'includes'
                                         ,value:currFilterValue} ] 
                              }
        return filterObject
    }
    

    useEffect(()=>{
        (currFilterProp && currFilterValue && currfilterOriginReducer)
            ? setFilterModel(buildFilterObject())
            : setFilterModel();
    },[currFilterProp,currFilterValue,currfilterOriginReducer]);

    useEffect(()=>{
        const sort = (currDefaultSortBy) && {sorting : {sortModel : [currDefaultSortBy],}};                 // defaultSortBy need to be like { field: 'rating', sort: 'desc' } doc here : https://mui.com/x/react-data-grid/sorting/
        const params = [sort];// Stack params here
        const buildedInitState = params.reduce((prev,curr)=> (curr) ? {...prev,...curr} : curr ,{});
        console.log(buildedInitState,initialState);      // If current param exist add it to initialState
        (buildedInitState) && setInitialState({...buildedInitState});
    },[currDefaultSortBy,currFilterProp,currFilterValue,currfilterOriginReducer]);

    //Configure custom render cell
    const customCellBuilder = {
        date : (params) => (
            <span>{(params.value) ? new Date(Date.parse(params.value)).toLocaleDateString("fr") : ''} </span>
        ),
        toggle : (params) => (
             <ToggleButton
                    value={params.value || 'Undefined'}
                    selected={params.value}
                    onChange={async () => {
                        //const response = await api.put(`${path}/${params.row.id}`, {[prop] : !params.value});
                        //const newData = await getUsers();
                        //setUsers(newData.data);
                    }}
                    aria-label={`testtoggle-${params.row.id}`}
                >
                                <GridCheckIcon />
            </ToggleButton>
        ),
        edit   : (params) => (
            <IconButton
                value={params.value}
                aria-label={`testEdit-${params.row.id}`}
                 onClick={()=>{
                                const reducerState = {...store.getState()[reducer]}; //{active:{},content:{},status:''};
                                const foundMainProp = [...Object.entries(currSchema).find((ent)=> ent[1].primaryKey)];
                                //  Object.keys(store.getState()).forEach(
                                //     (reducer)=> (store.getState()[reducer].activeItem) 
                                //                     && store.dispatch(actions[reducer].setActiveItem({}))
                                //                     );
                                if (foundMainProp.length > 0 ) {
                                    const mainProp = foundMainProp[0];
                                    const item = reducerState.allItems.find((item) => item[mainProp] === params.row[mainProp]);
                                    !(!item) && store.dispatch(actions[reducer].setActiveItem(item));
                                }
                                //store.dispatch()
                                store.dispatch(details.actions.setReducer({level,reducer}));
                                // store.dispatch(details.actions.setSubmitPayload({actionName:submitAction,params :{param:params.row.id, body:params.row}}));
                                // store.dispatch(details.actions.setContent(params.row));
                                store.dispatch(details.actions.setMode({mode:'',level}));
                                store.dispatch(details.actions.setOpen(level));
                              }
                          }
            >
                <EditIcon />
            </IconButton>
                    ),
        array   : (params) => {
            const valueProp = (currSchema[params.field].gridArrayProp) && currSchema[params.field].gridArrayProp;
            const array = (valueProp && params.value[0][valueProp]) && params.value.map((value) => `${value[valueProp]} `);
            return (array) ? array : '';
        }
    }

    return (
       <div className="datagrid__availableSpace" 
            ref={parentSize}
        >
            <div
                style={{ height: height || 200, width: '100%'}} 
                className="datagrid__container"
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    columnVisibilityModel={visibleCols}
                    filterModel = {filterModel}
                    //initialState= {initialState}
                    GridColDef="center"
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    components={useToolbar}
                    hideFooter={true}
                />
            </div>
        </div>
    )
}

export default React.memo(AdminDatagrid);
