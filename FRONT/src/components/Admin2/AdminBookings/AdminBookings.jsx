import React, { useEffect,useState } from 'react';
import './adminbooking.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import {useSelector} from 'react-redux';
const AdminBooking2 = () => {

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
                        schema='bookingSchema'
                        reducer='bookings'
                        level = 'primary'
                        />
                </div>
                    <AdminDetails   schema  =   'bookingSchema'
                                    reducer =   'bookings'
                                    level   =   'primary'
                                    titleOverride={(details.primary.mode === 'new')
                                                    ?'Nouvelle Réservation'
                                                    :null}
                    />
                    {/* <AdminDetails   schema  =   'articleSchema'
                                    reducer =   'articles'
                                    level   =   'secondary'
                                    titleOverride={(details.secondary.mode === 'new')
                                                    ?'Nouvel Article'
                                                    :null}
                    /> */}
            </div>
        </div>
    )
}

export default React.memo(AdminBooking2);