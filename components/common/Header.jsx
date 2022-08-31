import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Store } from "../../context/Store";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

function Header() {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    function Cart() {
        return (
            <Link href="/cart" passHref>
                <a className="p-2">
                    Cart
                    {cartItemCount > 0 && (
                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            {cartItemCount}
                        </span>
                    )}
                </a>
            </Link>
        );
    }

    return (
        <header>
            <nav className="flex h-12 items-center justify-between px-4 shadow-md">
                <Link href="/" passHref>
                    <a className="text-lg font-bold">tailwinda</a>
                </Link>
                <div className="flex items-center">
                    <Cart />
                    {status === "loading" ? (
                        "Loading"
                    ) : session?.user ? (
                        session.user.name
                    ) : (
                        <Link href="/login" passHref>
                            <a className="p-2">Login</a>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
