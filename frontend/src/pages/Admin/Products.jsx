import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Products() {

    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        name: '', price: '', description: '', stock: '', category: ''
    })
    const [image, setImage] = useState(null)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        axios.get('http://localhost:3000/api/product/products')
            .then((success) => {
                setProducts(success.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('price', form.price)
        formData.append('description', form.description)
        formData.append('stock', form.stock)
        formData.append('category', form.category)
        if (image) {
            formData.append('image', image)
        }

        if (editId) {
            // update
            axios.put(`http://localhost:3000/api/product/update/${editId}`, formData)
                .then(res => {
                    setProducts(products.map(p => p._id === editId ? res.data : p))
                    setEditId(null)
                    setForm({ name: '', price: '', description: '', stock: '', category: '' })
                    setImage(null)
                })
                .catch(err => console.log(err))
        } else {
            // add
            axios.post('http://localhost:3000/api/product/add', formData)
                .then(res => {
                    setProducts([...products, res.data])
                    setForm({ name: '', price: '', description: '', stock: '', category: '' })
                    setImage(null)
                })
                .catch(err => console.log(err))
        }
    }

    const handleEdit = (product) => {
        setEditId(product._id)
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            category: product.category
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/product/delete/${id}`)
            .then(() => {
                setProducts(products.filter(p => p._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>

            <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-8 bg-gray-50">
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required
                            className="w-full border rounded px-3 py-2 text-sm" placeholder="Product name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                            required={!editId}
                            className="w-full border rounded px-3 py-2 text-sm bg-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input name="price" type="number" value={form.price} onChange={handleChange} required
                            className="w-full border rounded px-3 py-2 text-sm" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input name="stock" type="number" value={form.stock} onChange={handleChange} required
                            className="w-full border rounded px-3 py-2 text-sm" placeholder="0" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input name="category" value={form.category} onChange={handleChange} required
                            className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Electronics" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={2}
                            className="w-full border rounded px-3 py-2 text-sm" placeholder="Product description" />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
                    {editId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="border rounded-lg overflow-hidden mb-10">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Product ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Slug</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-t">
                                <td className="p-3">#{product._id.slice(-8)}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="p-3">${product.price}</td>
                                <td className="p-3">{product.description}</td>
                                <td className="p-3">{product.stock}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.slug}</td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => handleEdit(product)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                                    <button onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={9} className="p-6 text-center text-gray-400">No products yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
