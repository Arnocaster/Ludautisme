import React, {useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import api from '../../../../requests';
import { Button, Slide, Box, Paper, Chip, Modal } from '@mui/material';
import InputAutocomplete from '../MaterialLibraryComponents/InputAutocomplete/InputAutocomplete'
import MaterialLibraryMenuFilter from '../MaterialLibraryFilter/MaterialLibraryMenuFilter';
import CloseIcon from '@mui/icons-material/Close';

const MaterialLibraryMenu = ({
    className,
    updateFilterState,
    getFilterState,
    removeFilterState,
    style,
    typeDisplay,
     ...rest}) => {

     //Init variables used to create select inputs
     const [categoriesList,setCategoriesList] = useState();
     const [tagsList,setTagsList] = useState();
     const [nameList,setNameList] = useState();

    const initCategories = async () => {
        const response = await api.get('/customer/category/');
        if (response.status === 200) {
            setCategoriesList(response.data.filter(cat=>cat.main));
            setTagsList(response.data.filter(cat=>!cat.main));
        } else {
            console.error(response.data);
        }
    }

    const initNames = async () => {
        if (typeDisplay === 'favorites'){
               const user= JSON.parse(localStorage.getItem('user'));
               const favorites = await api.get(`/customer/favorite/${user.id}`);
               if(favorites.data.ref_ids){
               const favNameList = favorites.data.ref_ids.map((ref)=> {return {id : ref.id, name:ref.name } });
                setNameList(favNameList);
               }
        }
        if(!typeDisplay || typeDisplay === 'mathériatèque'){
            const response = await api.get('/customer/articles/namelist');
            if (response.status === 200) {
                setNameList(response.data);
            } else {
                console.error(response.data);
            }
        }
    }

    const handleRemove = (e)=>{
        const dataAttr = e.currentTarget.closest('div').dataset.remove.split("-");
        const type = dataAttr[0];
        const dataId = dataAttr[1];
        removeFilterState[type](dataId);
    }

    const isDesktop = window.matchMedia('(min-width:1080px)').matches;
    const [open, setOpen] = useState(false);
    const handleClickMenu = (event) => {
            setOpen(true);
    };
    const handleCloseMenu = () => {
       setOpen(false);
    };

    const filtersRef = useRef();
    const filtersContainerRef = useRef();

    //Optimisation : Need to bee trigered on focus input, not on loading.
    useEffect(()=>{
        initCategories();
        initNames();
    },[]);
   return (
       <div

            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
        <Box className='materiallibrarymenu-inputs' >
        <Box className='materiallibrarymenu-inputs-container'>
            {/* Mobile Version, a button open a modal */}
            <Modal
            className={'materiallibrarymenu-inputs-modal'}
            onClose={handleCloseMenu} open={open}>
                <Box className='materiallibrarymenu-inputs-modal__content'>
                    <p><strong>Filtres</strong></p>
                    <div className='materiallibrarymenu-filters-container'>
                        <div className='materiallibrarymenu-filters-container-list'>
                                    {(categoriesList) &&
                                        categoriesList.map(cat=>(
                                            (getFilterState.categories.includes(cat.id))&&
                                                (<Chip key={`cat-${cat.id}`}
                                                        data-remove={`categories-${cat.id}`} 
                                                        label={cat.name} 
                                                        variant="outlined" 
                                                        onDelete={handleRemove}/>)
                                        ))
                                    }
                                    {(tagsList) &&
                                        tagsList.map(tag=>(
                                            (getFilterState.tags.includes(tag.id))&&
                                                (<Chip key={`tag-${tag.id}`} 
                                                        data-remove={`tags-${tag.id}`} 
                                                        label={tag.name} 
                                                        variant="outlined" 
                                                        onDelete={handleRemove}/>)
                                        ))
                                    }

                        </div>
                        <Button className={(!getFilterState.categories
                                        && !getFilterState.tags
                                        && !getFilterState.available
                                        )
                                        ?'hidden'
                                        :''
                                        } onClick={updateFilterState.reset}>Reset</Button>
                    </div>
                    <MaterialLibraryMenuFilter
                        className={`is--menu`}
                        ref={filtersRef}
                        updateFilterState={updateFilterState}
                        getFilterState={getFilterState}
                        removeFilterState={removeFilterState}
                        categoriesList={categoriesList}
                        tagsList={tagsList}
                        nameList={nameList}
                        isDesktop = {isDesktop}
                        typeDisplay = {typeDisplay}
                        //handleCloseMenu = {handleCloseMenu}
                    />
                    <Box sx={{display:'flex',alignItems:'center',alignContent:'center',borderRadius:'2rem',border:'1px solid black',padding:'5px 10px'}} 
                        onClick={handleCloseMenu}
                    >
                        <p>Fermer</p>
                        <CloseIcon/>
                    </Box>
                </Box>
            </Modal>
             <Button
                className='is--menu__button menu__button'
                onClick={handleClickMenu}
                >
                    Filtres
            </Button>
                {/* Desktop version */}
                    <MaterialLibraryMenuFilter
                    className='is--desktop'
                ref={filtersRef}
                updateFilterState={updateFilterState}
                getFilterState={getFilterState}
                removeFilterState={removeFilterState}
                categoriesList={categoriesList}
                tagsList={tagsList}
                nameList={nameList}
                isDesktop = {isDesktop}
                typeDisplay = {typeDisplay}
                />
        </Box>
                <Paper elevation={3} sx={{borderRadius: '2rem'}} className='materiallibrarymenu-searchbar'>
                    <InputAutocomplete
                        autoComplete
                        clearOnEscape
                        freeSolo
                        listOnFocus = {true}
                        currState = {getFilterState.name}
                        updateState = {updateFilterState.name}
                        className = 'searchbar'
                        placeholder= 'Rechercher'
                        eltsList = {nameList}
                        searchIcon = {true}
                        onChange = {(newValue) => {
                                const pattern = newValue.split(" ").map(word=>`(?=.*${word})`).join("");
                                const regex = new RegExp(pattern,'i');
                                const found = nameList.filter((tag)=>tag.name.match(regex));
                                return {searchValue: newValue , ids: found.map( elt=> Number(elt.id) )};
                            }
                        }
                    />
                </Paper>
        </Box>
        <Box  ref={filtersContainerRef} style={{width:'100%',display:'block'}}>
          <Slide direction="down"
                 in={(getFilterState.tags.length > 0
                    || getFilterState.categories.length > 0)
                    || getFilterState.available
                    || getFilterState.searchValue
                    || getFilterState.favorite
                }
                 mountOnEnter unmountOnExit
                 container={filtersContainerRef.current}>
                <div className='materiallibrarymenu-filters-container'>
                    <p className='materiallibrarymenu-filters-container__title'>Filtres :</p>
                    <div className='materiallibrarymenu-filters-container-list'>
                                {(categoriesList) &&
                                    categoriesList.map(cat=>(
                                        (getFilterState.categories.includes(cat.id))&&
                                            (<Chip key={`cat-${cat.id}`}data-remove={`categories-${cat.id}`} label={cat.name} variant="outlined" onDelete={handleRemove}/>)
                                    ))
                                }
                                {(tagsList) &&
                                    tagsList.map(tag=>(
                                        (getFilterState.tags.includes(tag.id))&&
                                            (<Chip key={`tag-${tag.id}`} data-remove={`tags-${tag.id}`} label={tag.name} variant="outlined" onDelete={handleRemove}/>)
                                    ))
                                }
                                {(getFilterState.available === true)&&
                                    (<Chip key={`avail-${getFilterState.available}`} 
                                            data-remove={`available`} 
                                            label={'Disponible'} 
                                            variant="outlined" 
                                            onDelete={handleRemove}/>)}
                                {(getFilterState.favorite && typeDisplay !== "favorites")&&
                                    (<Chip key={`fav-${getFilterState.favorite}`} 
                                            data-remove={`favorite`} 
                                            label={'Favoris'} 
                                            variant="outlined" 
                                            onDelete={handleRemove}/>)}
                                {(getFilterState.searchValue) &&
                                    (<Chip key={`search-${getFilterState.searchValue}`} data-remove={`searchValue`} label={`Recherche: ${getFilterState.searchValue}`} variant="outlined" onDelete={handleRemove}/>)}

                    </div>
                    <Button onClick={updateFilterState.reset}>Reset</Button>
                </div>
            </Slide>
        </Box>
        </div>

   );
};

MaterialLibraryMenu.propTypes = {
    className: PropTypes.string,
};
MaterialLibraryMenu.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibraryMenu);
