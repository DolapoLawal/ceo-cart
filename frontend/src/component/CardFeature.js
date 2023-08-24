import React from 'react'
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlide';
import { useDispatch } from 'react-redux';

const CardFeature = ({image,name,price,category,loading,id}) => {
    const dispatch = useDispatch()


  const handleAddCartProduct = (e)=>{
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
   };


  return (
    <div className='w-full min-w-[220px] max-w-[220px] bg-white hover:showdow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col '>
        {image ? (
           <>
           <Link to={`/products/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}>
          <div className='h-28 '>
            <img src={image} className='h-full'/>
        </div>
        <h1 className='font-semibold text-slate-600 text-center capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h1>
      <p className='text-center text-slate-500 font-medium '>{category}</p>
      <p > 
        <span className='text-center font-bold'>₦</span>
      <span>{price}</span>
      </p>
      </Link>
      <button className=' bg-red-500 py-1 mt-2 rounded  w-full ' onClick={handleAddCartProduct}>Add to Cart</button>
      
          </>
          ): (
          <div className='min-h-[150px] flex justify-center items-center'>
          <p>{loading}</p>
          </div>
        )}
        
    
    </div>
   
  );
};

export default CardFeature