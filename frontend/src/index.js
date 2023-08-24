import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Products from './page/Products';
import About from './page/About';
import Contact from './page/Contact';
import Home from './page/Home';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import { store } from "./redux/index";
import { Provider } from 'react-redux';
import Cart from './page/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      {/* <Route path='products' element={<Products/>}/> */}
      <Route path='products/:filterby' element={<Products/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/> 
      <Route path='login' element={<Login/>}/>
      <Route path='newproduct' element={<Newproduct/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='cart' element={<Cart/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
  <RouterProvider router={router}/>
  </Provider>
);