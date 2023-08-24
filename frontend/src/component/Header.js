import React, { useState } from 'react'
import bny from "../assets/logonow.png"
import { Link } from 'react-router-dom';
import {FaUser} from "react-icons/fa";
import {BsCart4} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

export const Header = () => {
  const [showProducts, setShowProducts] = useState(false);
 const userData = useSelector((state)=> state.user);
 console.log(userData.email)
// const { _id, firstName, lastName, email } = useSelector((state) => state.user);
const { _id } = userData; 


  const dispatch = useDispatch()

  const handleShowProducts = () =>{
     setShowProducts(preve => !preve)
  }
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("logout successful");
  };

  // console.log(process.env.REACT_APP_ADMIN_EMAIL)

 const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className='fixed shadow
    md w-full h-20 px-2 md:px-4 bg-green-200'>
        {/* desktop */}

        <div className='flex items-center h-full justify-between' >
        <Link to ={""}>
            <div className='md w-full max-w-sm -ml-20 p-0 px-11 h-20'>
            <img src={bny} alt='logo'/>
            </div>
          </Link>
           <div className='flex items-center gap-4 md:gap-7'>
          <nav className='gap-5 md:gap-6 text-base md:text-lg hidden md:flex'>
             <Link to={""} >Home</Link>
             <Link to={"products/64e388befb589b5b32c64fcf"}>Products</Link>
             <Link to={"about"}>About</Link>
             <Link to={"contact"}>Contact</Link>
          </nav>
          <div className='text-2xl text-slate-600 relative'>
         <Link to={"cart"}> <BsCart4/>
          <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartItemNumber.length}</div>
          </Link>
          
          </div>
          <div className='text-slate-600 flex items-center justify-center'>
            <div className='text-3xl cursor-pointer'onClick={handleShowProducts}>
           <FaUser/>
          <div>
            {showProducts && (
            <div className='absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w[120px] text-center'>
              {
                userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link to={"Newproduct"} className='whitespace-nowrap cursor-pointer'>New product</Link>
              }
              
               {
              _id ? (<p className='cursor-pointer text-white bg-red-500' onClick={handleLogout}>Logout ({userData.firstName})</p>) : <Link to={"Login"} className='whitespace-nowrap cursor-pointer px-2'>login</Link>
               }
              
              <nav className='gap-5 md:gap-6 text-base md:text-lg flex flex-col md:hidden'>
             <Link to={""}>Home</Link>
             <Link to={"products/64e388befb589b5b32c64fcf"}>Products</Link>
             <Link to={"about"}>About</Link>
             <Link to={"contact"}>Contact</Link>
          </nav>
             </div>
            )}

          </div>
          </div>
          </div>
          </div>
        </div>

         {/* mobile */}
    </header>
  )
}
