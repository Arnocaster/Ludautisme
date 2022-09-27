import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import Home from '../Front-Office/Home/Home';
import UserHome from '../Front-Office/User/UserHome/UserHome';
import HomePage from '../Front-Office/Static/HomePage/HomePage';
import Admin from '../Admin/Admin';
import AdminHome2 from '../Admin2/AdminHome/AdminHome'
import AdminUsers2 from '../Admin2/AdminUsers/AdminUsers'
import AdminReferences2 from '../Admin2/AdminReferences/AdminReferences'
import AdminPage from '../Admin/AdminPage/AdminPage';
import AdminHome from '../Admin/AdminHome/AdminHome';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import AdminBookings from '../Admin/AdminBookings/AdminBookings';
import AdminReferences from '../Admin/AdminReferences/AdminReferences';
import About from '../Front-Office/Static/About/About';
import Infos from '../Front-Office/Static/Infos/Infos';
import MaterialLibrary from '../Front-Office/MaterialLibrary/MaterialLibrary';
import UsefullLinks from '../Front-Office/Static/UsefullLinks/UsefullLinks';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Error from '../Front-Office/Reusable/Error/Error';
import ResetPwd from '../Front-Office/User/ResetPassword/ResetPassword';
import { useState } from 'react';
import * as cartReq from '../../requests/customer/cart';
import * as refReq from '../../requests/customer/reference';
import Privacy from '../Privacy/Privacy';
import Notice from '../Notice/Notice';
export const FunctionContext= React.createContext();


function App() {

    let [itemsToCart, setItemsToCart] = useState([]);
    const cartManager = {
            init : async () =>{
                const response = await cartReq.getCart();
                const cartRefs = response.data.id_refs;
                if (cartRefs){
                    const items = await cartReq.getItems(cartRefs);
                    setItemsToCart(items.data || []);
                }

            },
            add : async (item) => {
                await cartReq.addToCart(item.id);
                setItemsToCart(itemsToCart => [...itemsToCart, item]);
            },
            remove : async (item) => {
                await cartReq.deleteFromCart(item);
                if (item === "all") {
                    setItemsToCart([]);
                    await cartReq.clearCart();
                } else {
                let hardCopy = [...itemsToCart];
                hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item);
                setItemsToCart(hardCopy);
                }
            },

    };



    // Client Application
    return (
    <div className="App">
        <Routes>
            {/* PUBLIC FRONT-OFFICE */}
            <Route path = "/" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<HomePage />} />}></Route>
            <Route path = "/about" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<About />} />}></Route>
            <Route path = "/infos" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<Infos />} />}></Route>
            <Route path = "/usefulllinks" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<UsefullLinks />} />}></Route>
            <Route path = "/materiallibrary" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<FunctionContext.Provider value ={cartManager}><MaterialLibrary currentItems = {itemsToCart}  /></FunctionContext.Provider>} />}></Route>
            <Route path = "/notice" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<Notice />} />}></Route>
            <Route path = "/privacy" element = {<Home  currentItems = {itemsToCart} cartManager={cartManager} children={<Privacy/>} />}></Route>

            
            {/*ADMIN REFACTOR*/}
            <Route path = "/admin2/home" element = {<AdminHome2 />}></Route>
            <Route exact path = "/admin2/users/"  element={(<AdminHome2 content={<AdminUsers2 />} />)}/>
            <Route exact path = "/admin2/references/"  element={(<AdminHome2 content={<AdminReferences2 />} />)}/>
            {/* <Route path = "/admin/references/:id" element = {<AdminReference />}></Route> */}
            {/* <Route path = "/admin/references/:id/articles" element = {<AdminArticles />}></Route> */}
            {/* <Route path = "/admin/categories" element = {<AdminCategories />}></Route> */}
            {/* <Route path = "/admin/logout" element = {<AdminLogout />}></Route> */}



            {/* OLD ADMIN PANEL  */}
            <Route path = "/admin" element = {<Admin />}></Route>
            <Route path = "/admin/home" element = {<PrivateRoute/>}>
                <Route path = "/admin/home" element = {<AdminPage><AdminHome /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/users" element = {<PrivateRoute/>}>
                <Route path = "/admin/users" element = {<AdminPage><AdminUsers /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/references" element = {<PrivateRoute/>}>
                <Route path = "/admin/references" element = {<AdminPage><AdminReferences /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/bookings" element = {<PrivateRoute/>}>
                <Route path = "/admin/bookings" element = {<AdminPage><AdminBookings /></AdminPage>}></Route>
            </Route>


            {/* LOGGED USER FRONT-OFFICE */}
            <Route path = "/user/account" element = {<PrivateRoute/>}>
                <Route path = "/user/account" element = {
                    <Home
                        currentItems = {itemsToCart}
                        cartManager={cartManager}
                        children={
                                <UserHome/>
                        }
                    />
                }>

                </Route>
            </Route>
            <Route path = "/user/bookings" element = {<PrivateRoute/>}>
                <Route path = "/user/bookings" element = {<Home currentItems = {itemsToCart} cartManager={cartManager} children={<UserHome/>} />}></Route>
            </Route>
             <Route path = "/user/favorites" element = {<PrivateRoute/>}>
                <Route path = "/user/favorites" element = {<Home currentItems = {itemsToCart} cartManager={cartManager} children={<UserHome/>} />}></Route>
            </Route>
            <Route path = "/user/articles" element = {<Home children={<FunctionContext.Provider ><MaterialLibrary /></FunctionContext.Provider>} />}></Route>
            <Route path = "/resetpassword/:token" element ={<ResetPwd />}></Route>

            {/* 404 */}
            <Route path = "*" element = {<Error />}></Route>
        </Routes>
    </div>
    );
}

export default App;
