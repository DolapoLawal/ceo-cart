import React from 'react'
import  { useState } from 'react'
import { BiShow,BiHide } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';


const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : "", 
    });
    const navigate =useNavigate()


   const userData = useSelector(state => state)
   console.log(userData)

    const dispatch = useDispatch()

    const handleShowPassword = () =>{
       setShowPassword(preve => !preve)
    }
    
     const handleonChange = (e) =>{
        const {name,value} = e.target
        setData ((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
       
     }

     const handleSubmit = async(e)=>{
        e.preventDefault()
        const{email,password} = data 
        if (email && password ){
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
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
                    dispatch(loginRedux(dataRes))
                    setTimeout(() =>{
                    navigate("/")
                }, 1000);
                }
                console.log(userData)
        }
        else{
            alert("Please Enter required fields")
        }
     }
  return (
    <div className='p-3 md:4'>
        <div className='w-full max-w-sm bg-white m-auto flex-col p-4'>
        <h1 className='px-20 text-center'>Login</h1>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
           
            <label htmlFor='email'>Email</label>
            <input type={"email"} id='email' name='email' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.email} onChange={handleonChange}/>
         
            <label htmlFor='password'>Password</label>
          <div className='flex bg-slate-200 px-2 py-1 rounded mt-1 mb-2'>
           <input type={showPassword ?"text":"password"} id='password' name='password' className='mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-200'value={data.password} onChange={handleonChange}/>
          <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<BiShow/> : <BiHide/>}</span>
          </div>
        

          <button className='max-w-[120px] w-full mt-3 text-white bg-slate-800 hover:bg-green-200 cursor-pointer py-1 rounded-full '>Sign in</button>
        </form>
        <p className='text-sm'>Don't have account ? <Link to={"/signup"} className='bg-green-200 underline'>Sign up</Link></p>
        </div>
        </div>
  )
  };

export default Login 