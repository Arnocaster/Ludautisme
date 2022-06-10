import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../public/logo.png';
import LoginUser from '../User/LoginUser/LoginUser'
import './header.scss';
// import { NavLink } from 'react-router-dom';
// import CartModal from '../CartModal/CartModal';
import Cart from '../Cart/Cart';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import {Button} from '@mui/material'
import Navbar from '../Navbar/navbar';
import Menu from '@mui/material/Menu';




const Header = ({
    className,
    currentItemsNumber,
    currentItems,
    cartManager,
     ...rest}) => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isMobile = () => {
        setMobile(window.matchMedia("(max-width: 820px)").matches);
        console.log(mobile);
    }
    window.addEventListener('resize', isMobile);

    const [mobile,setMobile] = useState(false);

    const navigate = useNavigate();
    const goTo = (event)=>{
        navigate(event.target.value);
    }

    useEffect(() => {isMobile();}, [userToken])
    return (
       <header
            className={classnames('header', className)}
            id="myHeader"
            {...rest}>
        <Box className="header-content">
            <div className="header-logo">
                <img src={Logo} className="header-logo-img" alt="Logo" />
            </div>



                {(mobile)?
                <>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <Navbar handleClose={handleClose}/>
                </Menu>
                </>
                :
                <Navbar/>
            }
                <div class="header-items">
                    <Cart cartManager={cartManager} currentItems = {currentItems}/>
                    <LoginUser/>
                </div>
            </Box>
        </header>
   );
};

Header.propTypes = {
    className: PropTypes.string,
};
Header.defaultProps = {
    className: '',
};

export default React.memo(Header);

