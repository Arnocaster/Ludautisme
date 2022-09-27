import React, { useEffect } from 'react';
import './adminreferences.scss';
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

    const getReferences = apiSlice.useGetReferencesQuery();              //Mandatory on top-level for useEffect usage
    const { details, references } = useSelector(state => state); //Redux state

    store.dispatch(actions.references.handleFetch(getReferences)); //First loading only, fetch an store api
    // console.log(references,actions.references.handleFetch());
    console.log();

    const buttons = [
        [{label : 'ajouter',
          action : {reducer:'references',mode:'new',submitAction:'useAddReferenceMutation'}
        }]
    ]


    //Refrech on each render
    useEffect(()=>{
        getReferences.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.references.handleFetch(getReferences));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //Refetch on detail modification
    useEffect(()=>{
        getReferences.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.references.handleFetch(getReferences));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[details]);

    
    return (
        <div className = 'adminReferences'>
            <AdminDashboardMenu title='Références' buttons={buttons}/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        rows={references.references}
                        schema={referenceSchema}
                        reducer='references'
                        submitAction = 'useUpdateReferencesMutation'
                        />
                </div>
                        {(Object.keys(details.content).length > 0 || details.mode === 'new')  &&
                                <AdminDetails schema={referenceSchema} 
                                              titleOverride={(details.mode === 'new')
                                                                ?'Nouvel utilisateur'
                                                                :null}
                        />}
            </div>
        </div>
    )
}

export default React.memo(AdminReferences2);
