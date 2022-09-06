import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../components/common/Layout";
import Wizard from "../components/common/Wizard";
import { Store } from "../context/Store";
import { checkoutSteps } from "../utils/constants";

function PaymentPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;
    const router = useRouter();

    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push("/shipping");
        }

        setSelectedPaymentMethod(paymentMethod || "");
    }, [paymentMethod, router, shippingAddress.address]);

    function submitHandler(e) {
        e.preventDefault();

        if (!selectedPaymentMethod) {
            return toast.error("Payment method is required");
        }

        dispatch({
            type: "SAVE_PAYMENT_METHOD",
            payload: selectedPaymentMethod,
        });

        Cookies.set(
            "cart",
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );

        router.push("/placeorder");
    }

    return (
        <Layout title="Payment Method">
            <Wizard steps={checkoutSteps} activeStep={2} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-xl">Payment Method</h1>
                {["PayPal", "Stripe", "CashOnDelivery"].map(
                    (payment, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="p-2 outline-none focus:ring-0"
                                id={payment}
                                checked={selectedPaymentMethod === payment}
                                onChange={() =>
                                    setSelectedPaymentMethod(payment)
                                }
                            />
                            <label htmlFor={payment} className="p-2">
                                {payment}
                            </label>
                        </div>
                    )
                )}
                <div className="mb-4 flex justify-between">
                    <button
                        type="button"
                        className="default-button"
                        onClick={() => router.push("/shipping")}
                    >
                        Back
                    </button>
                    <button
                        className="primary-button"
                        // onClick={() => router.push("/shipping")}
                    >
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default PaymentPage;
