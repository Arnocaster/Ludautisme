import React, { useEffect,useState } from 'react';
import './adminreference.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import {useSelector} from 'react-redux';
const AdminReferences2 = () => {

    //const getReferences = apiSlice.useGetReferencesQuery();              //Mandatory on top-level for useEffect usage
    const { details} = useSelector(state => state); //Redux state

    //store.dispatch(actions.references.handleFetch(getReferences)); //First loading only, fetch an store api
    //console.log(getReferences);
    const [buttons,setButtons] = useState([]);

    useEffect(()=>{
        const buttonStruct = [
        [{label : 'ajouter',
          action : {reducer:'references',mode:'new',submitAction:'useAddReferenceMutation'}
        }]
        ]
        setButtons([...buttonStruct])},[]);
    
    return (
        <div className = 'adminReferences'>
            <AdminDashboardMenu title='Références' buttons={buttons} reducer='references'/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        schema='referenceSchema'
                        reducer='references'
                        level = 'primary'
                        />
                </div>
                    <AdminDetails   schema='referenceSchema'
                                    reducer='references'
                                    level='primary'
                                    titleOverride={(details.mode === 'new')
                                                    ?'Nouvelle Référence'
                                                    :null}
                    />
                    <AdminDetails   schema='articleSchema'
                                    reducer='articles'
                                    level='secondary'
                                    titleOverride={(details.mode === 'new')
                                                    ?'Nouvelle Référence'
                                                    :null}
                    />
            </div>
        </div>
    )
}

export default React.memo(AdminReferences2);
