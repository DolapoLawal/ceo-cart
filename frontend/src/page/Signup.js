import React from 'react'
import  { useState } from 'react'
import { BiShow,BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

function Signup() {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [data,setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : ""
    });

    // console.log(data)
    const handleShowPassword = () => { 
       setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword = () =>{
        setShowConfirmPassword(preve => !preve)
     }
     const handleonChange = (e) =>{
        const {name,value} = e.target
        setData ((preve)=>{
            return{
                ...preve,
                [name] : value
            };
        });
        
     }
    console.log(process.env.REACT_APP_SERVER_DOMAIN) 
     const handleSubmit = async(e)=>{
        e.preventDefault()
        const{firstName,email,password,confirmPassword} = data 
        if (firstName && email && password && confirmPassword){
            if(password === confirmPassword){

                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                
                const dataRes = await fetchData.json()
                console.log(dataRes)
                toast(dataRes.message)
                if(dataRes.alert){
                     navigate("/login");
                }
            }
            else{
                alert("password and confirm password do not match")
            }
        }
        else{
            alert("Please Enter required fields")
        }
     }
  return (
    <div className='p-3 md:4'>
        <div className='w-full max-w-sm bg-white m-auto flex-col p-4'>
        <h1 className='px-20 text-center'>Sign Up</h1>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input type={"text"} id='firstname' name='firstName' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200' value={data.firstName} onChange={handleonChange}/>
         
            <label htmlFor='LastName'>Last Name</label>
            <input type={"text"} id='lastname' name='lastName' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.lastName} onChange={handleonChange}/>
            
            
            <label htmlFor='email'>Email</label>
            <input type={"email"} id='email' name='email' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.email} onChange={handleonChange}/>
         
            <label htmlFor='password'>Password</label>
          <div className='flex bg-slate-200 px-2 py-1 rounded mt-1 mb-2'>
           <input type={showPassword ?"text":"password"} id='password' name='password' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.password} onChange={handleonChange}/>
          <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<BiShow/> : <BiHide/>}</span>
          </div>

          <label htmlFor='confirmpassword'>Confirm Password</label>
          <div className='flex bg-slate-200 px-2 py-1 rounded mt-1 mb-2'>
           <input type={showConfirmPassword ?"text":"password"} id='confirmPassword' name='confirmPassword' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.confirmPassword} onChange={handleonChange}/>
          <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ?<BiShow/> : <BiHide/>}</span>
          </div>
        

          <button className='max-w-[120px] w-full mt-3 text-white bg-slate-800 hover:bg-green-200 cursor-pointer py-1 rounded-full '>Create Account</button>
        </form>
        <p className='text-sm'>Already have account ? <Link to={"/login"} className='bg-green-200 underline'>Login</Link></p>
        </div>
        </div>
  )
}

export default Signup