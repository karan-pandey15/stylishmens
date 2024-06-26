// use dispatch method

// "use client";
// import React from 'react'
// import { remove } from '@/Redux/Cartslice';
// import { useDispatch,useSelector } from 'react-redux';
// import Navbar from '../components/navbar/page';
// import Footer from '../components/footer/page';
// import Link from 'next/link';


// const Cartpage = () => {
    // const dispatch=useDispatch();
    // const cartitems = useSelector((state)=>state.cart)


    // const handleremove =(id)=>{
    //     dispatch(remove(id))
    // }


//   return (
//     <div>
//         <Navbar />
//         {
//             cartitems.length<=0 ? <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} > 
//                 <h1 style={{textAlign:'center',color:'red',fontWeight:'bolder',fontSize:20}} >Cart is empty</h1>
//                <Link href='/pages/addtocart' >  <button style={{width:'180px',padding:10,border:'2px solid black',fontWeight:'bold',marginTop:'10px'}} >GoTo Shop</button></Link>

//             </div> :<div className='cartWrapper'>
//             {
//                 cartitems.map((item)=>(
//                     <div className='cartCard' key={item.id} >
//                         <img src={item.image} alt='img'/>
//                         <h5>{item.title}</h5>
//                         <h5>{item.price}</h5>
//                         <button className='btn' onClick={()=>handleremove(item.id)}>Remove</button>
//                     </div>
//                 ))
//             }
//         </div>
        
//         }
//         <Footer />
//     </div>
//   )
// }

// export default Cartpage




"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import Link from 'next/link';
import { remove } from '@/Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux';
import './Cartstyle.css';
import Image from 'next/image';

const Cartpage = () => {
  // State to hold the cart items and total price
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Retrieve the data from local storage
    const storedItems = localStorage.getItem('cart');

    // Parse the JSON string into JavaScript objects
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);
      // Calculate total price when cart items change
      const price = parsedItems.reduce((total, item) => total + item.price, 0);
      setTotalPrice(price);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const dispatch = useDispatch();

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    // Show an alert to confirm item removal
    const confirmRemoval = window.confirm('Are you sure you want to remove this item?');
    if (confirmRemoval) {
      // Filter out the item with the specified id
      const updatedCart = cartItems.filter((item) => item.id !== id);
      dispatch(remove(id));
      // Update the cart state
      setCartItems(updatedCart);
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Recalculate total price
      const price = updatedCart.reduce((total, item) => total + item.price, 0);
      setTotalPrice(price);
    }
  };


//   const handleCheckout = () => {
//     // Retrieve user email from localStorage
//     const userEmail = localStorage.getItem("userEmail");
//     console.log('the email is ',userEmail)
  
//     // Create checkout data object including user email
//     const checkoutData = {
//       email: userEmail,
//       items: cartItems
//     };
  
//     // Send cart data to backend
//     fetch('http://localhost:5000/api/checkout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(checkoutData), // Send the checkoutData object
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Clear cart after successful checkout
//           setCartItems([]);
//           localStorage.removeItem('cart');
//           alert('Checkout successful!');
//         } else {
//           throw new Error('Checkout failed');
//         }
//       })
//       .catch((error) => {
//         console.error('Error during checkout:', error);
//         alert('Checkout failed. Please try again later.');
//       });
// };


const handleCheckout = () => {
  // Retrieve user email from localStorage
  const userEmail = localStorage.getItem("userEmail");
  console.log('the email is ',userEmail)

  // Create checkout data object including user email
  const checkoutData = {
    email: userEmail, // Include user's email
    items: cartItems
  };

  // Send cart data to backend
  fetch('http://localhost:5000/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData), // Send the checkoutData object
  })
    .then((response) => {
      if (response.ok) {
        // Clear cart after successful checkout
        setCartItems([]);
        localStorage.removeItem('cart');
        alert('Checkout successful!');
      } else {
        throw new Error('Checkout failed');
      }
    })
    .catch((error) => {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again later.');
    });
};


  
  return (
    <div>
      <Navbar />
      {cartItems.length <= 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder', fontSize: 20 }}>Cart is empty</h1>
          <Link href='/pages/addtocart'><button style={{ width: '180px', padding: 10, border: '2px solid black', fontWeight: 'bold', marginTop: '10px' }}>GoTo Shop</button></Link>
        </div>
      ) : (
        <div className='cartWrapper'>
          {cartItems.map((item, id) => (
            <div className='main_cart_div' key={id} >
              <div className='child_cart_div' >
                <img className='cart_img_style' src={item.image.src} alt='img' />
                <h5 className='cart_heading'>{item.title}</h5>
                <h5 className='cart_heading'>{item.price}</h5>
                <button className='cart_btn' onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length>0 ?
      <div className='checkout_div'  >
            <div className='child_checkout_div'  >
            <h2 className='checkout_heading' >Total Price:<span style={{color:'blue'}} > ${totalPrice}</span></h2>
            <button className='checkout_btn'  onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
          :''}


      <Footer />
    </div>
  );
};

export default Cartpage;


// import React, { useEffect, useState } from 'react';

// const CartComponent = () => {
//   // State to hold the cart items
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Retrieve the data from local storage
//     const storedItems = localStorage.getItem('cart');

//     // Parse the JSON string into JavaScript objects
//     if (storedItems) {
//       const parsedItems = JSON.parse(storedItems);
//       setCartItems(parsedItems);
//     }
//   }, []); // Empty dependency array ensures this effect runs only once

//   return (
//     <div>
//       <h2>Cart</h2>
//       <div>
//         {cartItems.map(item => (
//           <div key={item.id}>
//             <img src={item.image.src} alt={item.title} />
//             <h3>{item.title}</h3>
//             <p>{item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartComponent;