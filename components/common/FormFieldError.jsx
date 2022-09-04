import React from "react";

function FormFieldError({ errorMessage }) {
    return <div className="text-red-500">{errorMessage}</div>;
}

export default FormFieldError;
