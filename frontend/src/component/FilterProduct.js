import React from 'react'
import {GiLaptop} from "react-icons/gi"

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
     <div className={`text-3xl p-3  rounded-full cursor-pointer ${isActive ? "bg-red-300" : "bg-green-200"}`} >
    <GiLaptop/>
  </div>
  <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
   )
}

export default FilterProduct