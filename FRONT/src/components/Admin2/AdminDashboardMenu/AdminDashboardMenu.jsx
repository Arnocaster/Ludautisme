import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import store from '../../../store';
import {actions} from '../../../store/reducers';
import './admindashboardmenu.scss';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';

const AdminDashboardMenu = ({title, buttons,reducer}) => {
    const { details, users } = useSelector(state => state); //Redux state 

    const handleNewElement = (params) => {
        store.dispatch(actions.details.setMode({mode:'new',level:'primary'}));
        store.dispatch(actions[reducer].clearActiveItem());
        store.dispatch(actions[reducer].setActiveItem({}));
        store.dispatch(actions.details.setOpen('primary'));
    }

    const [btns,setBtns] = useState(buttons);
    useEffect(()=>{setBtns(buttons)},[buttons]);

     const [tit,setTit] = useState(title);
    useEffect(()=>{setTit(title)},[title])

    return (
        <div className='admin-dashboardmenu'>
            <div className='admin-dashboardmenu__title'>{tit}</div>
            <div className='admin-dashboardmenu__container'>
                {btns.map((bloc,index) => {return (
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
