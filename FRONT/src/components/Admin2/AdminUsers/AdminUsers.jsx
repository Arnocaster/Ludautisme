import React, { useEffect,useState } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import {useSelector} from 'react-redux';
const AdminUsers2 = () => {

    //const getReferences = apiSlice.useGetReferencesQuery();              //Mandatory on top-level for useEffect usage
    const { details} = useSelector(state => state); //Redux state

    //store.dispatch(actions.references.handleFetch(getReferences)); //First loading only, fetch an store api
    //console.log(getReferences);
    const [buttons,setButtons] = useState([]);

    useEffect(()=>{
        const buttonStruct = [
        [{label : 'ajouter',
          action : {reducer:'users',mode:'new',submitAction:'useAddUserMutation'}
        }]
        ]
        setButtons([...buttonStruct])},[]);
    
    return (
        <div className = 'adminusers'>
            <AdminDashboardMenu title='Utilisateurs' buttons={buttons} reducer='users'/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        schema='userSchema'
                        reducer='users'
                        level = 'primary'
                        />
                </div>
                    <AdminDetails   schema='userSchema'
                                    reducer='users'
                                    level='primary'
                                    titleOverride={(details.primary.mode === 'new')
                                                    ?'Nouvel utilisateur'
                                                    :null}
                    />
            </div>
        </div>
    )
}

export default React.memo(AdminUsers2);
