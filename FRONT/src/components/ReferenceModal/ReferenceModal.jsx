import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './referencemodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Unavailable from '../Unavailable/Unavailable';
import Available from '../Available/Available';
import { CardMedia, Divider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';

const ReferenceModal = ({className, ...rest}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [counter, setCounter] = useState(4);

//each time i add article to my booking, delete one on quantity
    function handleClick () {
        console.log(`add this article to my booking`)
        setCounter (counter > 0 ? counter -=1 : counter)
    }


    return (
        <div>
          <Button onClick={handleOpen}>description</Button>
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
              <Box className="referencemodal">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Nom de l'article
                </Typography>
                <Divider/>
                <Typography id="transition-modal-title" variant="h6" component="h5">
                  description de l'article: blablabla
                </Typography>
                {counter > 0 ? <Available/> : <Unavailable/>}
                <Typography id="transition-modal-title" variant="h6" component="h5">
                  Prix:
                </Typography>
                <Divider/>
                <CardMedia
                component="img"
                height="140"
                image="../../public/legosfix.png"
                alt="image about the article"
                className= "cardmedia"
            />
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 Catégorie: Jeux
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 Quantité: {counter}
                </Typography>
                    <Button
                    onClick={handleClick}>
                        <AddShoppingCartIcon/>
                    </Button>
              </Box>
            </Fade>
          </Modal>
        </div>
      );
};

ReferenceModal.propTypes = {
    className: PropTypes.string,
};
ReferenceModal.defaultProps = {
    className: '',
};
export default React.memo(ReferenceModal);