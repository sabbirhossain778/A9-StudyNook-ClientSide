'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { RxAvatar } from 'react-icons/rx';


const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/login";
    };

    const publicLinks = (
        <>
            <li><NavLink href="/" className="hover:text-primary  transition-colors">Home</NavLink></li>
            <li><NavLink href="/all-rooms" className="hover:text-primary transition-colors">Rooms</NavLink></li>
        </>
    );

    const privateLinks = user && (
        <>
            <li><NavLink href="/add-room" className="hover:text-primary transition-colors">Add Room</NavLink></li>
            <li><NavLink href="/my-listings" className="hover:text-primary transition-colors">My Listings</NavLink></li>
            <li><NavLink href="/my-bookings" className="hover:text-primary transition-colors">My Bookings</NavLink></li>
        </>
    );

    return (
        <div className='bg-cyan-800 sticky top-0 z-50 shadow-md'>
            <div className="navbar max-w-7xl mx-auto px-4 md:px-8 text-white">

                {/* Navbar start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden text-white">
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
                        {/* Menu dropdown */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[999] p-3 shadow-2xl bg-white rounded-2xl w-52 font-bold gap-1 text-slate-900 border border-slate-100">
                            <div className="flex flex-col gap-1 text-slate-900 [&_a]:text-slate-900 [&_a]:font-bold active:[&_a]:text-white">
                                {publicLinks}
                                {privateLinks}
                            </div>
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link href="/" className="text-xl md:text-2xl font-bold tracking-wide text-white">
                        StudyNook
                    </Link>
                </div>

                {/* Navbar Center (Desktop) */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold gap-2 text-base text-white/90">
                        {publicLinks}
                        {privateLinks}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end">
                    {isPending ? (
                        <span className="loading loading-spinner loading-sm text-white"></span>
                    ) : user ? (
                        /* Logged In: Profile Dropdown */
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-white/50 p-0.5">
                                <div className="w-10 rounded-full overflow-hidden flex items-center justify-center bg-cyan-700">
                                    {user?.image ? (
                                        <Image
                                            src={user.image}
                                            alt="User avatar"
                                            width={40}
                                            height={40}
                                            unoptimized={true}
                                            className="rounded-full aspect-square object-cover"
                                        />
                                    ) : (
                                        <RxAvatar className="text-[30px] md:text-[35px] text-white" />
                                    )}
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-xl bg-base-100 rounded-xl w-56 gap-1 text-gray-800 font-medium">
                                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                                    <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <li className="md:hidden"><Link href="/add-room">Add Room</Link></li>
                                <li><Link href="/my-listings">My Listings</Link></li>
                                <li><Link href="/my-bookings">My Bookings</Link></li>
                                <div className="border-t border-gray-100 my-1"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-sm btn-error btn-outline mt-1 w-full text-xs font-bold rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* Not logged */
                        <div className='flex gap-2 items-center'>
                            <Link href={'/login'}>
                                <Button size="sm" className="bg-white text-cyan-800 font-bold rounded-full px-4 hover:bg-gray-100">Login</Button>
                            </Link>
                            <Link href={'/signup'}>
                                <Button size="sm" className="bg-cyan-900 text-white font-bold rounded-full px-4 border border-white/20 hover:bg-cyan-950">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;