import React from "react";

function CheckoutWizard({ activeStep = 0 }) {
    return (
        <div className="mb-5 flex">
            {[
                "User Login",
                "Shipping Address",
                "Payment Method",
                "Place Order",
            ].map((step, index) => (
                <div
                    key={index}
                    className="flex flex-1 flex-col items-center justify-end"
                >
                    <div
                        className={`mb-2 w-8 ${
                            index <= activeStep
                                ? "bg-indigo-400"
                                : "bg-gray-400"
                        } text-center text-white`}
                    >
                        {index + 1}
                    </div>
                    <div
                        className={`w-full flex-1 border-b-2 text-center ${
                            index <= activeStep
                                ? "border-indigo-400 text-indigo-400"
                                : "border-gray-400 text-gray-400"
                        }`}
                    >
                        {step}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CheckoutWizard;
