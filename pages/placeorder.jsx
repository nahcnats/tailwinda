import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import Layout from "../components/common/Layout";
import Wizard from "../components/common/Wizard";
import Empty from "../components/common/Empty";
import { Store } from "../context/Store";
import { getError } from "../utils/error";
import { checkoutSteps } from "../utils/constants";

function PlaceOrderPage() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 1.5);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push("/payment");
        }
    }, [paymentMethod, router]);

    async function placeOrderHandler() {
        try {
            setLoading(true);

            const { data } = await axios.post("/api/orders", {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });

            setLoading(false);

            dispatch({ type: "CART_CLEAR_ITEMS" });
            Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));

            router.push(`/order/${data._id}`);
        } catch (e) {
            setLoading(false);
            toast.error(getError(e));
        }
    }

    if (cartItems.length === 0) {
        return <Empty message="Cart is empty" actionMessage="Go shopping" />;
    }

    return (
        <Layout title="Place Order">
            <Wizard steps={checkoutSteps} activeStep={3} />
            <h1 className="mb-4 text-xl">Place Order</h1>
            <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <div className="card p-5">
                        <h2 className="mb-4 text-lg">Shipping Address</h2>
                        <div className="mb-2">
                            {shippingAddress.fullName},{" "}
                            {shippingAddress.address}, {shippingAddress.city},{" "}
                            {shippingAddress.postalcode},{" "}
                            {shippingAddress.state}, {shippingAddress.country}
                        </div>
                        <div>
                            <Link href="/shipping" passHref>
                                <a>Edit</a>
                            </Link>
                        </div>
                    </div>
                    <div className="card p-5">
                        <h2 className="mb-4 text-lg">Payment Method</h2>
                        <div className="mb-2">{paymentMethod}</div>
                        <div>
                            <Link href="/payment" passHref>
                                <a>Edit</a>
                            </Link>
                        </div>
                    </div>
                    <div className="card overflow-x-auto p-5">
                        <h2 className="mb-4 text-lg">Order Items</h2>
                        <table className="mb-2 min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td>
                                            <Link
                                                href={`/product/${item.slug}`}
                                                passHref
                                            >
                                                <a className="flex items-center">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded"
                                                    />
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="text-right">
                                            {item.quantity}
                                        </td>
                                        <td className="text-right">
                                            RM {item.price}
                                        </td>
                                        <td className="text-right">
                                            RM {item.quantity * item.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <Link href="/cart" passHref>
                                <a>Edit</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card p-5">
                        <h2 className="mb-4 text-lg">Order Summary</h2>
                        <ul>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Items</div>
                                    <div>RM {itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Tax</div>
                                    <div>RM {taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Shipping</div>
                                    <div>RM {shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Total</div>
                                    <div>RM {totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button
                                    disabled={loading}
                                    onClick={placeOrderHandler}
                                    className="primary-button w-full"
                                >
                                    {loading ? "Loading..." : "Place Order"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PlaceOrderPage;
