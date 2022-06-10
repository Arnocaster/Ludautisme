import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './cartmodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import CurrentReference from '../CurrentReference/CurrentReference';
import api from '../../requests/index';
import AlertMessage from '../AlertMessage/AlertMessage';

const CartModal = ({
    open,
    handleClose,
    setModalOpen,
    className,
    currentItemsNumber,
    currentItems,
    userId,
    cartManager,
     ...rest
    }) => {
    const [alertMessage, setAlertMessage] = useState();
    let [counter, setCounter] = useState(null);

    function handleRemoveItemClick  () {
        setCounter(currentItems.length);
        console.log(`Nombre d'article en cours`, counter);
        (currentItems.length === 0) && handleClose() ;
    }

    //CLICK ON VALIDATE CART
    const handleSubmit =  async (event) => {
        event.preventDefault();
        const refIds = {
            refIds : currentItems.map((item)=>{return item.id}),
        };
            const response =  await api.post(`/customer/booking/add/${userId}`, refIds)
        if (response.status === 200){
            setAlertMessage({
                message : 'Votre réservation a bien été prise en compte',
                severity : 'success'});
            setTimeout(()=>{handleClose();
                            setAlertMessage();
                            cartManager.remove("all")},1000);
        }
        else
        {
            setAlertMessage({
                message : response.data.message}
                );
                setTimeout(()=>{handleClose();},1000);
            console.error(`CARTMODAL/AlertMessage : Une erreur est survenue`, response.data);
        };
    }
    //CALLBACK USED IN CURRENT REFERENCE TO GET ITEM AND DELETE HERE IN currentCart
    const removeItem = (itemId) =>{
       cartManager.remove(itemId);
    }

    useEffect(()=> {
        countSentence();
        },[open]);


    const countSentence = ()=>{
        if (currentItems === null){
            return `Votre panier est vide`
        }
         if (currentItems.length ===0){
             return `Votre panier est vide`
          } else
        if (currentItems.length > process.env.REACT_APP_BORROW_LIMIT) {
             return `Vous ne pouvez pas réserver plus de ${process.env.REACT_APP_BORROW_LIMIT} articles`
         } else {
             return `Vous pouvez encore réserver ${process.env.REACT_APP_BORROW_LIMIT - currentItems.length} articles`
         }

    }

    return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >

          <Fade in={open}>
            <Box className="shopmodal">
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Mon panier
              </Typography>
              <Divider/>
              <Box className="cartDetails">
                <Box className = "cartCount">
                <Typography>{countSentence()}</Typography>
                </Box>
                <Divider/>
                {(currentItems && currentItems.length > 0) &&
                <Box className = "cartItems">
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Voici l'ensemble de vos articles :
                            </Typography>
                            <Box className="cartListItems">
                            {currentItems.map((currentItem,index)=>(
                            <CurrentReference
                                key = {index}
                                changeCounter = {handleRemoveItemClick}
                                removeItem = {removeItem}
                                currentItem = {currentItem}
                                //handleClose={handleClose}
                            />
                                ))}
                            </Box>
                            <Button
                            onClick={handleSubmit}
                            >
                            Valider le panier
                            </Button>
                            {alertMessage && (
                                    <AlertMessage
                                        message={alertMessage.message}
                                        severity={alertMessage.severity}
                                    >
                                    </AlertMessage>
                            )}
                </Box>
                }
              </Box>
            </Box>
          </Fade>
        </Modal>
    );
};

CartModal.propTypes = {
    className: PropTypes.string,
};
CartModal.defaultProps = {
    className: '',
};
export default React.memo(CartModal);
