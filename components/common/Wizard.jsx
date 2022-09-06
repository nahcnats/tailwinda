import React from "react";

function Wizard({ steps, activeStep = 0 }) {
    return (
        <div className="mb-5 flex">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex flex-1 flex-col items-center justify-end"
                >
                    <div
                        className={`mb-2 w-8 ${
                            index <= activeStep ? "bg-secondary" : "bg-inActive"
                        } text-center text-white`}
                    >
                        {index + 1}
                    </div>
                    <div
                        className={`w-full flex-1 border-b-2 text-center ${
                            index <= activeStep
                                ? "border-secondary text-secondary"
                                : "border-inActive text-inActive"
                        }`}
                    >
                        {step}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Wizard;
