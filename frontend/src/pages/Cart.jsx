import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reduxtoolkit/slices/cartslice'
import { CartContext } from '../Context/Cart'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Cart() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const initRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {

        setLoading(true);

        try {

            // load razorpay
            const loaded = await initRazorpay();
            if (!loaded) {
                setError("Razorpay failed to load. Check your internet.");
                setLoading(false);
                return;
            }

            // create order
            const res = await fetch("http://localhost:3000/api/razorpay", { method: "POST" })
            if (!res.ok) {
                setError("Failed to create payment order. Try again.");
                setLoading(false);
                return;
            }
            const data = await res.json();

            // open razorpay
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                name: "Your Store",
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                description: "Order payment",

                handler: async function (response) {

                    try {
                        const data = ({
                            user: localStorage.getItem('userId'),
                            items: cartItems,
                            total: getCartTotal(),
                            paymentStatus: "Completed",
                            orderStatus: "Processing",
                            paymentId: response.razorpay_payment_id
                        })

                        await axios.post('http://localhost:3000/api/order/add', data);
                        clearCart();
                        navigate('/my-orders')
                    } catch (error) {
                        setError("Order saving failed. Contact support.");
                    } finally {
                        setLoading(false);
                    }
                },

                modal: {
                    ondismiss: function () {
                        setError("Payment cancelled.");
                        setLoading(false);
                    }
                }

            };

            new window.Razorpay(options).open();

        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div>

            {/* cart */}
            {cartItems.length === 0 ? (
                <h2>Your cart is empty</h2>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item._id} className='flex justify-between 
                                items-center my-4 border-b pb-4'>

                            <img src={item.image} alt={item.name}
                                className="h-20 w-20 object-cover rounded-lg" />

                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold">
                                    {item.name}</h3>
                                <div>qty: {item.quantity}</div>
                                <p className="text-white font-semibold">
                                    ${item.price}</p>
                            </div>


                            <button onClick={() => removeFromCart(item)} className="text-white">Remove</button>
                        </div>
                    ))}
                    <button onClick={clearCart} className="text-xl font-bold text-white">Clear cart</button>

                    <div className="flex justify-between items-center mt-6">
                        <h3 className="text-xl font-bold text-white">Total: ${getCartTotal()}</h3>

                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                        <button onClick={handlePayment}
                            disabled={isLoading}
                            className="text-xl font-bold text-white">
                            {isLoading ? "Loading" : "Pay Now"}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}