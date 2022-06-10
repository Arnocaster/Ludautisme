import React from 'react';
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


const Navbar = ({
    handleClose,
    ...rest})=>{
    const navigate = useNavigate();
    const goTo = (event)=>{
        navigate(event.target.value);
        handleClose();
    }
    return(
        <nav>
        <Box className="main_pages">
            <Button
                value = '/'
                onClick = {goTo}
                className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
            >
                Accueil
            </Button>
            <Button
                value = '/about'
                onClick = {goTo}
                className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
            >
                Association
            </Button>
            <Button
                value = '/materiallibrary'
                onClick = {goTo}
                className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
            >
                Matériathèque
            </Button>
            <Button
                value = '/infos'
                onClick = {goTo}
                className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
            >
                Infos pratiques
            </Button>
            <Button
                value = '/usefullLinks'
                onClick = {goTo}
                className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
            >
                Liens utiles
            </Button>
        </Box>
        </nav>
    )
};

export default React.memo(Navbar);