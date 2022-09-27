import React from 'react';
import {useSelector} from 'react-redux';
import store from '../../../store';
import {actions} from '../../../store/reducers';
import './admindashboardmenu.scss';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';

const AdminDashboardMenu = ({title, buttons}) => {
    const { details, users } = useSelector(state => state); //Redux state 

    const handleNewElement = (params) => {
        console.log(params.submitAction,actions);
        store.dispatch(actions.details.setContent({}));
        store.dispatch(actions.details.setReducer(params.reducer));
        store.dispatch(actions.details.setSubmitPayload({actionName:params.submitAction}));
        store.dispatch(actions.details.setMode('new'));
        store.dispatch(actions.details.setOpen());
        //store.dispatch(details.action.setSubmitPayload());
    }

    return (
        <div className='admin-dashboardmenu'>
            <div className='admin-dashboardmenu__title'>{title}</div>
            <div className='admin-dashboardmenu__container'>
                {buttons.map((bloc,index) => {return (
                    <div key={`bloc_${index}`}>
                        {bloc.map(button => {return(<Button key={`bloc_${index}_${button.label}`} variant="contained" onClick={()=>{handleNewElement(button.action)}}>{button.label}</Button>)})}
                    </div>
                )}
                                
                            )
                }
            
            </div>

            <div className='admin-dashboardmenu__loading-zone'>
                {(users.status === 'pending') && <CircularProgress className='admin-dashboardmenu__circularprogress'/>}
            </div>
        </div>
    )
}

export default React.memo(AdminDashboardMenu);
