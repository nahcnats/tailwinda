import React, { useContext, useState, useEffect, useReducer } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/common/Layout";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";

import { getError } from "../../utils/error";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST": {
            return { ...state, loading: true, error: "" };
        }
        case "FETCH_SUCCESS": {
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: "",
            };
        }
        case "FETCH_FAIL": {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}

function OrderPage() {
    const { query } = useRouter();
    const { id: orderId } = query;

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (e) {
                dispatch({ type: "FETCH_FAIL", payload: getError(e) });
            }
        };

        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, orderId]);

    if (loading) {
        return <Loader isVisible={loading} />;
    }

    if (error !== "") {
        return <Error message={error} />;
    }

    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
    } = order;

    return (
        <Layout title={`Order ${orderId}`}>
            <h1 className="mb-4 text-xl">Order ${orderId}</h1>
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
                        {isDelivered ? (
                            <div className="alert-success">
                                Delivered at {deliveredAt}
                            </div>
                        ) : (
                            <div className="alert-error">Not delivered</div>
                        )}
                    </div>
                    <div className="card p-5">
                        <h2 className="mb-4 text-lg">Payment Method</h2>
                        <div className="mb-2">{paymentMethod}</div>
                        {isPaid ? (
                            <div className="alert-success">
                                Paid at {paidAt}
                            </div>
                        ) : (
                            <div className="alert-error">Not paid</div>
                        )}
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
                                {orderItems.map((item) => (
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
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderPage;
