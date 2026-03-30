import React, { useEffect, useState } from 'react'
import axios from "axios";
import ProductList from '../components/ProductList';

export default function Home() {

    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/product/products').then(
            response => {
                setData(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div>

            <div>
                <img src="/header-section.webp" alt="header-section" />
            </div>

            <ProductList />
        </div>
    )
}
