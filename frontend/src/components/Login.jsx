import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export default function Login({ onSuccess, onRegisterClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)


    const loginHandler = async (e) => {
        e.preventDefault();
        const data = ({
            email,
            password
        })
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, data)
            .then((success) => {
                if (!success.data.status) {
                    alert(success.data.message)
                    return
                }
                const token = success.data.token;
                const decoded = jwtDecode(token);
                localStorage.setItem('userId', decoded.userdata._id);
                localStorage.setItem('token', token);
                onSuccess();
                navigate("/profile");
            })
            .catch((err) => console.error("Login failed:", err));
    }

    return (

        <div className=" bg-card border border-card-line rounded-xl shadow-2xs">
            <div className="p-2 sm:p-5">
                <div className="text-center">
                    <h3 id="hs-modal-signin-label" className="block text-2xl font-bold text-foreground">Sign in</h3>
                    <p className="mt-2 text-sm text-muted-foreground-2">
                        Don't have an account yet?
                        <Link to="/register" className='font-bold underline' onClick={onSuccess}>Sign Up here</Link>
                    </p>
                </div>

                <div className="mt-2">

                    <div className="py-2 flex items-center text-xs text-muted-foreground uppercase before:flex-1 before:border-t before:border-line-2 before:me-6 after:flex-1 after:border-t after:border-line-2 after:ms-6">Or</div>

                    <form>
                        <div className="grid gap-y-2">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 text-foreground">Email address</label>
                                <div className="relative">
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <label htmlFor="password" className="block text-sm mb-2 text-foreground">Password</label>
                                </div>
                                <div className="relative">
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="py-2.5 sm:py-3 px-4 block w-full bg-layer border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error" />
                                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                            </div>

                            <button onClick={loginHandler} type="submit" className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus disabled:opacity-50 disabled:pointer-events-none">Log in</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
