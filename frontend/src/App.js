import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './component/Header';
import { Toaster } from 'react-hot-toast';
import { setDataProduct } from './redux/productSlide';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';





function App() {
  const dispatch = useDispatch()
  // const productData = useSelector((state)=>state.product)

  useEffect(() => {
    (async () => {
      try {
        const apiUrl = 'https://backend12-kg4x.onrender.com/product';
      // console.log('Fetching data from:', apiUrl);
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const resData = await res.json();
        console.log(resData);

        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [ dispatch ]);

  // console.log(productData)
  

  
  return (
    <>
    <Toaster />
    <div >
      <Header/>
      <main className='pt-20 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      
      </main>
    </div>
    </>
  );
}

export default App;



// import "./App.css";
// import { Outlet } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useEffect } from "react";
// import { setDataProduct } from "./redux/productSlide";
// import { useDispatch, useSelector } from "react-redux";
// import { Header } from "./component/Header";

// function App() {
//   const dispatch = useDispatch()
//   const productData = useSelector((state)=>state.product)
 
//   useEffect(()=>{
//     (async()=>{
//       const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
//       const resData = await res.json()
//       console.log(resData);
//       dispatch(setDataProduct(resData))
//     })()
//   },[])

//   return (
//     <>
//       <Toaster />
//       <div>
//         <Header/>
//         <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;