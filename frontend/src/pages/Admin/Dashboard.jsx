import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [orders, setOrders] = useState(null);
    const token = localStorage.getItem('token')

    useEffect(() => {

        axios.get('http://localhost:3000/api/admin/summary',
            { headers: { Authorization: `Bearer ${token}` } })
            .then((success) => {
                setSummary(success.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get('http://localhost:3000/api/admin/orders',
            { headers: { Authorization: `Bearer ${token}` } })
            .then((success) => {
                setOrders(success.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:3000/api/admin/orders/${id}`, { orderStatus: status }, { headers: { Authorization: `Bearer ${token}` } })
            .then((success) => {
                setOrders(orders.map(o =>
                    o._id === id ? { ...o, orderStatus: status } : o
                ))
            })
    }

    if (!summary) return <p className="p-6">Loading...</p>

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="border rounded-lg p-5 text-center">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold">{summary.totalOrders}</p>
                </div>

                <div className="border rounded-lg p-5 text-center">
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">{summary.totalRevenue}</p>
                </div>

                <div className="border rounded-lg p-5 text-center">
                    <p className="text-gray-500 text-sm">Processing</p>
                    <p className="text-3xl font-bold">{summary.processing}</p>
                </div>

                <div className="border rounded-lg p-5 text-center">
                    <p className="text-gray-500 text-sm">Shipped</p>
                    <p className="text-3xl font-bold">{summary.shipped}</p>
                </div>

                <div className="border rounded-lg p-5 text-center">
                    <p className="text-gray-500 text-sm">Delivered</p>
                    <p className="text-3xl font-bold">{summary.delivered}</p>
                </div>
            </div>

            {/* Orders Table */}
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <div className="border rounded-lg overflow-hidden mb-10">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-t">
                                <td className="p-3">#{order._id.slice(-8)}</td>
                                <td className="p-3">{order.user?.name || 'N/A'}</td>
                                <td className="p-3">${order.total}</td>
                                <td className="p-3">{order.paymentStatus}</td>
                                <td className="p-3">{order.orderStatus}</td>
                                <td className="p-3">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
