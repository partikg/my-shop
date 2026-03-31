import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/Cart';

export default function ProductList() {

    const [data, setData] = useState([]);
    const { cartItems, addToCart } = useContext(CartContext)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/product/products`).then(
            response => {
                setData(response.data.products || response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div>


            <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Products For You</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

                    {data?.map((data) => {
                        return (
                            <div key={data._id} className="bg-white flex flex-col rounded-sm overflow-hidden shadow-md hover:scale-[1.01] transition-all relative">
                                <Link to={`/product/${data.slug}`} className="block">
                                    <div className="w-full">
                                        <img src={data.image} alt="Product-1"
                                            className="w-full aspect-[18/24] object-cover object-top" />
                                    </div>
                                    <div className="p-4">
                                        <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">{data.name}</h5>
                                        <div className="mt-2 flex items-center flex-wrap gap-2">
                                            <h6 className="text-sm sm:text-base font-semibold text-slate-900">${data.price}</h6>

                                        </div>
                                    </div>
                                </Link>

                                <div className="min-h-[50px] p-4 !pt-0">
                                    <button onClick={() => addToCart(data)} type="button" className="absolute left-0 right-0 bottom-3 cursor-pointer max-w-[88%] mx-auto text-sm px-2 py-2 font-medium w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide outline-none border-none rounded-sm">Add to cart</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>
    )
}
