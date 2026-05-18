'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
import { Button } from '@heroui/react';


const Navbar = () => {
    const [user, setUser] = useState({
        name: "Sabbir Hossain",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    });

    const navLinks = (<>
        <li><NavLink href="/" className="hover:text-primary transition-colors">Home</NavLink></li>
        <li><NavLink href="/all-rooms" className="hover:text-primary transition-colors">All Rooms</NavLink></li>
        <li><NavLink href="/my-listings" className="hover:text-primary transition-colors">My Listings</NavLink></li>
        <li><NavLink href="/my-bookings" className="hover:text-primary transition-colors">My Bookings</NavLink></li>
        <li><NavLink href="/add-room" className="hover:text-primary transition-colors">Add Room</NavLink></li>
    </>
    );
    return (
        <div className='bg-cyan-800 sticky top-0 z-50'>
            <div className="navbar  max-w-7xl mx-auto shadow-md px-4 md:px-8">

            {/* Navbar start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 font-medium gap-2">
                        {navLinks}
                    </ul>
                </div>
                {/* Logo */}
                <Link href="/" className="text-xl md:text-2xl font-bold text-primary tracking-wide items-center text-white">
                    StudyNook
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 font-semibold gap-6 text-base text-neutral-content">
                    {navLinks}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                <ul className='flex gap-2 items-center'>
                    <li>
                        <Link href={'/login'}>
                        <Button variant="secondary">Login</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/register'}>
                        <Button variant="secondary">Register</Button>
                        </Link>
                    </li> 
                </ul>
            </div>
        </div>
        </div>    
    );
};

export default Navbar;



// {
//     user ? (
//         <div className="dropdown dropdown-end">
            
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-primary/20">
//                 <div className="w-10 rounded-full">
//                     <img alt={user.name} src={user.photoURL} />
//                 </div>
//             </div>
            
//             <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52 gap-2">
//                 <div className="px-2 py-1 border-b border-base-200">
//                     <p className="font-semibold text-neutral">{user.name}</p>
//                 </div>
//                 <li><a href="/my-bookings" className="mt-1">Dashboard</a></li>
//                 <li><button className="btn btn-sm btn-error btn-outline mt-2 w-full text-xs">Logout</button></li>
//             </ul>
//         </div>
//     ) : (
//         <a href="/login" className="btn btn-primary btn-sm md:btn-md px-6 text-white font-semibold rounded-lg shadow-md hover:bg-primary-focus transition-all">
//             Login
//         </a>
//     )
// }