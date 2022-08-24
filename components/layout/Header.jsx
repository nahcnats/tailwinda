import React from 'react';
import Link from 'next/link';
import { ListItem } from '@mantine/core';

function Header() {
    const navLinks = [
        { label: 'Cart', link: '/cart' },
        { label: 'Login', link: '/login' }
    ]


    return (
        <header>
            <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
                <Link href="/" passHref>
                    <a className='text-lg font-bold'>tailwinda</a>
                </Link>
                <div>
                    {navLinks.map((item, index) => <Link key={index} href={item.link} passHref><a className='p-2'>{ item.label }</a></Link>)}
                </div>
            </nav>
        </header>
    );
}

export default Header;