import React, { useState, useEffect,useRef } from 'react';
import './admindatagrid.scss';
import store from '../../../store';
import details from '../../../store/features/Admin/Details';
import { ToggleButton, IconButton  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridToolbar, frFR, GridCheckIcon } from '@mui/x-data-grid';

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
    rows,
    schema,
    submitAction,
    reducer,
    defaultSortBy,
}) => {

    // RESPONSIVE DATAGRID HEIGHT
    const [height, setHeight] = useState(null);
    const [clientHeight,setClientHeight] = useState(window.innerHeight);
    const parentSize = useRef();


    //Help to filter too many renderer, without, rendering each ms you are resising who makes brower bug.
    const debouncedHandleResize = debounce(() => {
        const delta = (window.innerHeight < clientHeight ) ?  clientHeight - window.innerHeight : 0;
        setClientHeight(window.innerHeight);
        console.log(parentSize.current.getBoundingClientRect().height,parentSize)
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

    const [columns] = useState(['id']);  //Allow datagrid render even without values

    const buildInitialState = () =>{
        const sort = (defaultSortBy) && {sorting : {sortModel : [defaultSortBy],}};                 // defaultSortBy need to be like { field: 'rating', sort: 'desc' } doc here : https://mui.com/x/react-data-grid/sorting/
        const params = [sort];                                                                      // Stack params here
        const buildedInitState = params.reduce((prev,curr)=> (curr) && {...prev,...curr} ,{});      // If current param exist add it to initialState
        return buildedInitState;
    }

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
                                store.dispatch(details.actions.setReducer(reducer));
                                store.dispatch(details.actions.setSubmitPayload({actionName:submitAction,params :{param:params.row.id, body:params.row}}));
                                store.dispatch(details.actions.setContent(params.row));
                                store.dispatch(details.actions.setMode());
                                store.dispatch(details.actions.setOpen());
                              }
                          }
            >
                <EditIcon />
            </IconButton>
                    ),
        array   : (params) => {
            const valueProp = (schema[params.field].gridArrayProp) && schema[params.field].gridArrayProp;
            const array = (valueProp && params.value[0][valueProp]) && params.value.map((value) => `${value[valueProp]} `);
            return (array) ? array : '';
        }
    }


    const columnBuilder = (()=>{
        return Object.keys(schema).map((field) => {
            return {
                type : schema[field].type,
                field : field,
                headerName: schema[field].label,
                width : schema[field].width,
                renderCell : customCellBuilder[schema[field].gridDisplay] || ''
            }

        });

    });


    return (
       <div className="datagrid__availableSpace" 
            ref={parentSize}
        >
            <div
                style={{ height: height || 200, width: '100%' }} 
                className="datagrid__container"
            >
                <DataGrid
                    rows={rows}
                    columns={(schema)? columnBuilder() : columns}
                    // initialState={(initialState)?initialState:{}}
                    initialState={buildInitialState()}
                    GridColDef="center"
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>
    )
}

export default React.memo(AdminDatagrid);
