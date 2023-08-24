
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import {GrFormPrevious,GrFormNext} from "react-icons/gr"
import AllProduct from '../component/AllProduct';
// import FilterProduct from '../component/FilterProduct';



const Home = () => {
 
  // const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product.productList);
  // console.log(productData);

  const homeProductCartList = productData.slice(0, 5);
  const homeProductCartListMobilePhone = productData.filter(el =>el.category === "Mobile Phone",[]
  )
  // console.log(homeProductCartListMobilePhone);

  const loadingArray = new Array(5).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft += 200
  };

  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
  };


  return (
    <div className='p-2 md:p-4'>
     <div className='md:flex gap-4 py-2'>

      <div className='md:w-1/2'>
        {/* <div className='flex gap-3 bg-slate-400 w-32 px-2 items-center rounded-full'>
        <p className='ext-sm font-medium text-slate-900'>Gadget Store</p>
          <img src='https://istranet.com/wp-content/uploads/2016/11/laptop-icon.png' className='h-7'/>
        </div> */}
      <h2 className='text-4xl  md:text-7xl font-bold'>The Best Gadget Store <span className='text-red-500'>in Nigeria</span></h2>
      <p className='py-3 text-base'>
Gadgets allow us to track our time better. A lot of us struggle with wasting too much time on social-networking sites or other activities which aren't productive. Smart phones allow us to keep track of our activities and remind us that there are more important things in life than wasting time on the internet.</p>
<button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'> Order Now</button>
      </div >
      <div className='md:w-1/2 flex flex-wrap gap-7 p-4 justify-center'>
         
         {
         homeProductCartList[0] ? homeProductCartList.map(el => {
               return (
                <HomeCard
          key={el._id}
          id={el._id}
          image={el.image}
          name={el.name}
          price={el.price}
          category={el.category}
          
          />
               );
          })
          :
          loadingArray.map((el,index)=>{
            return(
              <HomeCard
              key={index}
              loading={"Loading...."}
              
              />
            )
          })
         }
        </div>
     </div>
     <div className=''>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>Mobile Phone</h2>
        
        <div className='ml-auto flex gap-4'>
          <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' ><GrFormPrevious/></button>
          <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' ><GrFormNext/></button>
          </div>
          
        </div>
      <div className='flex gap-5 overflow-scroll scrollbar-none'ref={slideProductRef}>
        {
         homeProductCartListMobilePhone[0] ? homeProductCartListMobilePhone.map(el =>{
            return(
              <CardFeature
              key={el._id}
              id={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
              />
            )
          })
         :loadingArrayFeature.map((el) => (<CardFeature loading="loading..."/>
         ))}
       
      </div>

     </div>
      <AllProduct heading={"Product Categories"}/>




     {/* <div className='my-5'>
     <h2 className='font-bold text-2xl text-slate-800 mb-4'>Your Product</h2>
          
          
          <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
          {
            categoryList[0] && categoryList.map(el =>{
              return(
                <FilterProduct category={el} onClick={()=>handleFilterProduct(el)}/>
              )
            })
          }
           </div>
           <div className='flex flex-wrap justify-center gap-4 my-4'>
            {
              dataFilter.map(el => {
                return(
                  <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  />
                
                )
              })
            }
           </div>
     </div> */}
    </div>
  );
};

export default Home









