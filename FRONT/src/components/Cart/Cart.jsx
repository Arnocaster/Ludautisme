import React, {useState, useEffect}from 'react';
import PropTypes from 'prop-types';
import './cart.scss';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import Reference from '../Reference/Reference';
import CartModal from '../CartModal/CartModal';
import { Box } from '@mui/material';


const Cart = ({
    className,
    currentItems,
    cartManager,
     ...rest}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          background:"#ee4842",
          border: `2px solid #ffebcd`,
          padding: '0 4px',
        },
      }));

    //OPEN MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //USER INFO
    const [userToken, setUserToken] = useState ();
    const [userId, setUserId] = useState ();

    if (user && !userToken && !userId){
        setUserToken(user.token) ;
        setUserId(user.id);
    }

    //Persistent cart initialisation
    useEffect(()=> {
        getPersistentCart();
        },[]);

    const getPersistentCart = async () => {
        await cartManager.init();
    }
    //Floating Cart
    const [scroll, setScroll] = useState(false);
    const [lastScroll,setLastScroll] = useState();
    const [offsetLeft,setOffsetLeft] = useState();

    const getOffsetLeft = ()=>{
        const left = getCoords(document.querySelector('.cart')).left;
        setOffsetLeft(left);
    }

      useEffect(()=> {
        if(userToken){
            getOffsetLeft();
            window.addEventListener('resize', handleResize);
        }


        return _ => {
            window.removeEventListener('resize', handleResize)
        }
        },[]);


    window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 40);
    });

    function getCoords(elem) { // crossbrowser version
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }

    const handleResize = async () => {
        const cartElt = document.querySelector('.cart');
        cartElt.classList.remove('floating');
        const wrapperElt = document.querySelector('.cart-wrapper');
        await wrapperElt.appendChild(cartElt);
        const left = await getCoords(document.querySelector('.cart')).left;
        setOffsetLeft(left);
        setScroll(window.scrollY > 40);
        setCartFloating();
  }

    const setCartFloating = () => {
            if (scroll){
            const cartElt = document.querySelector('.cart');
            cartElt.classList.add('floating');
            cartElt.style.opacity = 0;
            cartElt.style.left = `${offsetLeft+15}px`;
            setTimeout(()=>{cartElt.style.opacity = 1},300);
            document.getElementById('root').appendChild(cartElt);
            setLastScroll(window.scrollY);
            } else {
                const cartElt = document.querySelector('.cart');
                cartElt.style.opacity = 0;
                setTimeout(()=>{cartElt.style.opacity = 1},300);
                const wrapperElt = document.querySelector('.cart-wrapper');
                wrapperElt.appendChild(cartElt);
                setLastScroll(window.scrollY);
            }
          };

    useEffect(()=> {
        if(userToken){
        setCartFloating();
        }
        },[scroll]);

   function handleCartBtnClick (event) {
    event.preventDefault();
   }
   return (
       <Box className='cart-wrapper' >
       {userToken &&
       <Box className={(scroll)?'floating cart':'cart'}>
       <Button

        {...rest}
        onClick= {handleOpen}
        >
            {
            (currentItems !== null && currentItems.length > 0) ?
            <>
            <StyledBadge badgeContent={currentItems.length} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
            </>
            :
            <>
                <ShoppingCartIcon />
            </>}
        </Button>
            <CartModal open = {open} handleClose = {handleClose} userId = {userId} cartManager={cartManager} currentItems = {currentItems}/>
            </Box>
       }
        </Box>
   );
};

Cart.propTypes = {
    className: PropTypes.string,
    currentItems: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            id: PropTypes.number.isRequired,
            maincategory: PropTypes.string,
            name:PropTypes.string.isRequired,
            picture:PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    url: PropTypes.string.isRequired
                }).isRequired
            ),
            tag:PropTypes.arrayOf(
                PropTypes.shape({
                  index:PropTypes.string
                })
            ),
            valorisation: PropTypes.number.isRequired
        })
    )
};
Cart.defaultProps = {
    className: '',
};
export default React.memo(Cart);
