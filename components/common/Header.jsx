import React, { useContext, useCallback } from 'react';
import Link from 'next/link';
import { Store } from '../../context/Store';

function Header() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    function Cart() {
        return (
            <Link href='/cart' passHref>
                <a className='p-2'>
                    Cart
                    {
                        cart.cartItems.length > 0 && (
                            <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </span>
                        )
                    }
                </a>
            </Link>
        );
    }

    return (
        <header>
            <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
                <Link href="/" passHref>
                    <a className='text-lg font-bold'>tailwinda</a>
                </Link>
                <div className='flex items-center'>
                    <Cart />
                    <Link href='/login' passHref>
                        <a className='p-2'>Login</a>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;