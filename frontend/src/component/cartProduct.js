import React from 'react'
import {FiPlus} from "react-icons/fi"
import {BiMinus} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { deleteCartItem,increaseQty,decreaseQty} from '../redux/productSlide';


const   CartProduct = ({id,name,image,category,qty,total,price}) => {
    const dispatch = useDispatch()
  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'> 
        <div className='p-3 bg-white rounded overflow-hidden'>
            <img src={image} className='h-28 w-32 object-cover' alt='' />
        </div>
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between '>
              <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>{name}</h3>
            {/* <h1 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>{Products}</h1> */}
       <div className='cursor-pointer text-slate-700 hover:text-red-500' onClick={()=>dispatch(deleteCartItem(id))}>
       <AiFillDelete/> 
        </div>    
        </div>
      <p className=' text-slate-500 font-medium text-2xl '>{category}</p>
      <p className='font-bold text-base'>₦<span>{price}</span></p>
           <div className='flex justify-between '>
           <div className='flex gap-3 items-center'>
            <button onClick={()=>dispatch(increaseQty(id))}className='bg-slate-300 py-1 mt-2 rounded hover:bg-red-400 p-1 '><FiPlus/></button>
            <p className='font-semibold p-1'>{qty}</p>
           <button 
           onClick={()=>dispatch(decreaseQty(id))} className='bg-slate-300 py-1 mt-2 rounded hover:bg-red-400 p-1 '><BiMinus/></button>
           </div>
           <div className='flex items-center gap-2 font-bold text-slate-700'>
            <p>Total :</p>
            <p className='font-bold text-base'>₦<span>{total}</span></p>
           </div>
           </div>
        </div>
    </div>
  );
};

export default  CartProduct