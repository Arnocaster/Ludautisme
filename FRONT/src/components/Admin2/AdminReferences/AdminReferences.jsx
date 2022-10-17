import React, { useEffect,useState } from 'react';
import './adminreference.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import { referenceSchema } from '../../../Schemas';
// import users from '../../../store/features/Admin/UsersList';
import store from '../../../store';
import {actions} from '../../../store/reducers';
import { apiSlice } from '../../../store/api/apiSlice.js';
import {useSelector} from 'react-redux';
const AdminReferences2 = () => {

    //const getReferences = apiSlice.useGetReferencesQuery();              //Mandatory on top-level for useEffect usage
    const { details} = useSelector(state => state); //Redux state

    //store.dispatch(actions.references.handleFetch(getReferences)); //First loading only, fetch an store api
    //console.log(getReferences);
    const [buttons,setButtons] = useState([]);

    useEffect(()=>{setButtons([
        [{label : 'ajouter',
          action : {reducer:'references',mode:'new',submitAction:'useAddReferenceMutation'}
        }]
    ])},[])
    
    return (
        <div className = 'adminReferences'>
            <AdminDashboardMenu title='Références' buttons={buttons} reducer='references'/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        schema={referenceSchema}
                        reducer='references'
                        />
                </div>
                    <AdminDetails   schema={referenceSchema}
                                    reducer='references'
                                    titleOverride={(details.mode === 'new')
                                                    ?'Nouvelle Référence'
                                                    :null}
                    />
            </div>
        </div>
    )
}

export default React.memo(AdminReferences2);
