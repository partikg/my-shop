import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const userId = localStorage.getItem('userId');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/users/${userId}`)
            .then((e) => {
                setData(e.data);
            })
    }, [userId])

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
        window.location.reload();
    }

    return (
        <div>

            {/* // profile */}
            <div className="bg-card border border-card-line rounded-xl shadow-2xs">
                <div className="p-2 sm:p-5">
                    <div className="text-center">
                        <h3 className="block text-2xl font-bold text-foreground">Profile</h3>
                    </div>

                    <div className="mt-2">

                        <div className="grid gap-y-2">
                            <div>
                                <label className="block text-sm mb-2 text-foreground">Name</label>
                                <p className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground">{data.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-foreground">Email address</label>
                                <p className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground">{data.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-foreground">Address</label>
                                <p className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground">{data.address}</p>
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-foreground">Role</label>
                                <p className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground">{data.role}</p>
                            </div>

                            <button onClick={logoutHandler} className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-red-600 border border-red-700 text-white hover:bg-red-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
