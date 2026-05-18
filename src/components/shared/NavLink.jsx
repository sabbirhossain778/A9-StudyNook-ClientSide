'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href, children}) => {
    const pathName = usePathname();
    const isActive = pathName === href;
    console.log(isActive, 'active');
    
    
    return (
        <Link href={href} className={`${isActive ? ' text-blue-800 font-bold text-[20px]' : 'text-black'}`}>
            {children}
        </Link>
    );
};

export default NavLink;