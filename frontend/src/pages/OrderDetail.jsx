import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

export default function OrderDetail() {
    let params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/order/orders/${params.id}`)
            .then((success) => {
                setData(success.data.order)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    if (!data) return <p>Loading...</p>

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-800'
            case 'Shipped': return 'bg-blue-100 text-blue-800'
            case 'Delivered': return 'bg-green-100 text-green-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className='max-w-3xl mx-auto px-6 py-8"'>

            <Link to="/my-orders"
                className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>
                <span className="ml-1 font-bold text-lg">Back</span>
            </Link>


            {/* order */}
            <div
                className="border rounded-lg p-5 mb-6">
                <h2 className="text-xl font-bold mb-4">
                    Order Info
                </h2>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-gray-500">Order ID</p>
                        <p className="font-medium">#{data._id}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Payment</p>
                        <p className="font-medium">{data.paymentStatus}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Order Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.orderStatus)}`}>
                            {data.orderStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* items */}
            <div className="border rounded-lg p-5 mb-6">
                <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
                {data.items.map((item) => (
                    <div key={item}>
                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.stock}</p>
                            </div>
                            <p className="font-semibold">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border rounded-lg p-5">
                <p className="text-lg font-bold">Total</p>
                <p className="text-xl font-bold">${data.total}</p>
            </div>

        </div>
    )
}
