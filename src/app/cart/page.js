"use client";
import React from 'react'
import { remove } from '@/Redux/Cartslice';
import { useDispatch,useSelector } from 'react-redux';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import Link from 'next/link';


const Cartpage = () => {
    const dispatch=useDispatch();
    const cartitems = useSelector((state)=>state.cart)


    const handleremove =(id)=>{
        dispatch(remove(id))
    }


  return (
    <div>
        <Navbar />
        {
            cartitems.length<=0 ? <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} > 
                <h1 style={{textAlign:'center',color:'red',fontWeight:'bolder',fontSize:20}} >Cart is empty</h1>
               <Link href='/pages/addtocart' >  <button style={{width:'180px',padding:10,border:'2px solid black',fontWeight:'bold',marginTop:'10px'}} >GoTo Shop</button></Link>

            </div> :<div className='cartWrapper'>
            {
                cartitems.map((item)=>(
                    <div className='cartCard' key={item.id} >
                        <img src={item.image} alt='img'/>
                        <h5>{item.title}</h5>
                        <h5>{item.price}</h5>
                        <button className='btn' onClick={()=>handleremove(item.id)}>Remove</button>
                    </div>
                ))
            }
        </div>
        
        }
        <Footer />
    </div>
  )
}

export default Cartpage