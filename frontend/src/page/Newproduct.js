import React, { useState } from 'react'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/imagetoBase64'
import { toast } from 'react-hot-toast'







const Newproduct = () => {

  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    images : "",
    price : "",
    description : "",
    specification: ""
  })
 
  const handleonChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e)=>{
   const data = await ImagetoBase64(e.target.files[0])
  //  console.log(data)
      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const uploadImages = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
   //  console.log(data)
       setData((preve)=>{
         return{
           ...preve,
           images : data
         }
       })
   }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)
    
    const {name,image,images,category,price} = data

    
 
  if (name && image && images && category && price) {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Fixed the header key here
      },
      body: JSON.stringify(data),
    });
  
    const fetchRes = await fetchData.json();
  
    console.log(fetchRes);
    toast(fetchRes.message);
  
    // Clear the form fields
    setData(()=>{
      return{
        name: "",
      category: "",
      image: "",
      images : "",
      price: "",
      description: "",
      specification: ""
      }
    })
     
  }
    

  else{
    toast("Enter required Fields")
  }

  }


  return (
    <div className='p-4 '>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type={"text"}  name="name" className='bg-slate-200 p-1 my-1' onChange={handleonChange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1 id="category'name='category' onChange={handleonChange} value={data.category}>
        <option value={"other"}>select category</option>
          <option value={"Mobile Phone"}>Mobile Phones</option>
          <option value={"Kids Tablets"}>Kids Tablets</option>
          <option value={"Laptops"}>Laptops</option>
          <option value={"BluetoothSpeakers"}>Bluetooth Speakers </option>
          <option value={"Headsets"}>Headsets</option>
          <option value={"PowerBanks"}>Power Banks</option>
          <option value={"Phones Accessories"}>Phones Accessories</option>
        </select>


       <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer'>
        {
          data.image ?  <img src={data.image} className='h-full' alt='' /> : <span className='text-5xl'><BsCloudUpload/></span>
        }
        

       <input type={"file"} accept='image/*' id="image" onChange={uploadImage} className='hidden'/>
        </div>
        </label>

        <label htmlFor='images'>Images
        <div className='h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer'>
        {
          data.images ?  <img src={data.images} className='h-full' alt='' /> : <span className='text-5xl'><BsCloudUpload/></span>
        }
        

       <input type={"file"} accept='image/*' id="images" onChange={uploadImages} className='hidden'/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1'name='price' onChange={handleonChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea rows={4} value={data.description} className='bg-slate-200 p-1 my-1 resize-none'name='description' onChange={handleonChange}></textarea>
        
        <label htmlFor='specification'>Specification</label>
        <textarea rows={5} value={data.specification} className='bg-slate-200 p-1 my-1'name='specification' onChange={handleonChange}></textarea>
        
       <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct


