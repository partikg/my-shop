import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/Cart';

export default function Product() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const { cartItems, addToCart } = useContext(CartContext)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/product/products/${slug}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={post.image} alt="Product Image" />
                        </div>
                        <div className="flex justify-center -mx-2 mb-4">
                            <div className="w-1/2 px-2">

                                <button onClick={() => addToCart(post)} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 text-center">Add to Cart</button>

                            </div>

                        </div>
                    </div>


                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{post.name}</h2>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300">${post.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock: {post.stock}</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {post.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
