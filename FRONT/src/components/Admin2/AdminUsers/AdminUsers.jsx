import React, { useEffect } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import { userSchema } from '../../../Schemas';
// import users from '../../../store/features/Admin/UsersList';
import store from '../../../store';
import {actions} from '../../../store/reducers';
import { useGetUsersQuery, apiSlice } from '../../../store/api/apiSlice.js';
import {useSelector} from 'react-redux';
const AdminUsers2 = () => {
    const getUsers = useGetUsersQuery(); //Mandatory on top-level for useEffect usage
    const { details, users, references } = useSelector(state => state); //Redux state

    store.dispatch(actions.users.handleFetch(getUsers));

    //store.dispatch(actions.users.handleFetch(getUsers)); //First loading only, fetch an store api

    const buttons = [
        [{label : 'ajouter',
          action : {reducer:'users',mode:'new',submitAction:'useAddUserMutation'}
        }]
    ]


    //Refrech on each render
    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.users.handleFetch(getUsers));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //Refetch on detail modification
    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.users.handleFetch(getUsers));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[details]);

    
    return (
        <div className = 'adminUser'>
            <AdminDashboardMenu title='Adhérents' buttons={buttons}/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        rows={users.users}
                        schema={userSchema}
                        reducer='users'
                        submitAction = 'useUpdateUserMutation'
                        defaultSortBy = {{ field: 'member_number', sort: 'asc' }}
                        />
                </div>
                        {(Object.keys(details.content).length > 0 || details.mode === 'new')&&<AdminDetails schema={userSchema} 
                                    titleOverride={(details.mode === 'new')?'Nouvel utilisateur':null}
                        />}
            </div>
        </div>
    )
}

export default React.memo(AdminUsers2);
