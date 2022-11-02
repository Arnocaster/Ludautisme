import React from 'react';
import './adminbuttonadd.scss';
import store from '../../../../store';
import {actions} from '../../../../store/reducers';
import {Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AdminButtonAdd = ({type,label,level,reducer,linkedProp}) => {
    //Parent link : used for new item (children) dependent of another item (parent)
    const handleAddAction = () => {
        console.log(level);
        store.dispatch(actions.details.setMode({mode:'new',level}));
        store.dispatch(actions[reducer].clearActiveItem());
        store.dispatch(actions[reducer].setActiveItem((linkedProp) ? linkedProp :{}));
        store.dispatch(actions.details.setReducer({level,reducer}));
        store.dispatch(actions.details.setOpen(level));
    }

    const elt = (type !== 'icon') 
                    ?
                    (   <Button
                            className='adminButton adminButton__add'
                            variant="contained" 
                            onClick={handleAddAction}
                        >
                            {label}
                        </Button>
                     )
                    :
                    (<div className='adminButton adminButton__add' onClick={handleAddAction}>
                        <AddCircleIcon />
                     </div>
                    )

    return elt
}

export default React.memo(AdminButtonAdd);
