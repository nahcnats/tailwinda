import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { Store } from "../../context/Store";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import DropdownLink from "./DropdownLink";
import "react-toastify/dist/ReactToastify.css";

function Header() {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemCount, setCartItemCount] = useState(0);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    function Cart() {
        return (
            <Link href="/cart" passHref>
                <a className="p-2 font-semibold">
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

    function logoutHandler() {
        Cookies.remove("cart");
        dispatch({ type: "CART-RESET" });
        signOut({ callbackUrl: "/login" });
    }

    return (
        <header className="z-10">
            <nav className="flex h-12 items-center justify-between px-4 shadow-md">
                <Link href="/" passHref>
                    <a className="text-lg font-bold text-primary">tailwinda</a>
                </Link>
                <div className="flex items-center">
                    <button
                        className="p-6"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? (
                            <MoonIcon className="h-5 w-5" />
                        ) : (
                            <SunIcon className="h-7 w-7" />
                        )}
                    </button>
                    <Cart />
                    {status === "loading" ? (
                        "Loading"
                    ) : session?.user ? (
                        <Menu as="div" className="relative z-10 inline-block">
                            <Menu.Button className="font-bold text-primary">
                                {session.user.name}
                            </Menu.Button>
                            <Menu.Items
                                className={
                                    "right absolute right-0 w-56 origin-top bg-white shadow-lg"
                                }
                            >
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/profile"
                                    >
                                        Profile
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/order-history"
                                    >
                                        Order History
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <a
                                        className="dropdown-link"
                                        href="#"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </a>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <Link href="/login" passHref>
                            <a className="p-2 font-semibold">Login</a>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
