import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Layout from "../components/common/Layout";
import CheckoutWizard from "../components/shipping/CheckoutWizard";
import FormFieldError from "../components/common/FormFieldError";
import { Store } from "../context/Store";

function ShippingPage() {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { cart } = state;
    const { shippingAddress } = cart;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        // getValues,
    } = useForm();

    useEffect(() => {
        setValue("fullName", shippingAddress.fullName);
        setValue("address", shippingAddress.address);
        setValue("city", shippingAddress.city);
        setValue("postalcode", shippingAddress.postalcode);
        setValue("state", shippingAddress.state);
        setValue("country", shippingAddress.country);
    }, [setValue, shippingAddress]);

    function submitHandler({
        fullName,
        address,
        city,
        postalcode,
        state,
        country,
    }) {
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: {
                fullName,
                address,
                city,
                postalcode,
                state,
                country,
            },
        });

        Cookies.set(
            "cart",
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalcode,
                    state,
                    country,
                },
            })
        );

        router.push("/payment");
    }

    return (
        <Layout title="Shipping Address">
            <CheckoutWizard activeStep={1} />
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Shipping Address</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        className="w-full"
                        id="fullName"
                        autoFocus
                        {...register("fullName", {
                            required: "Please enter full name",
                        })}
                    />
                    {errors.fullName && (
                        <FormFieldError
                            errorMessage={errors.fullName.message}
                        />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="fullName">Address</label>
                    <input
                        className="w-full"
                        id="address"
                        autoFocus
                        {...register("address", {
                            required: "Please enter address",
                            minLength: {
                                value: 3,
                                message:
                                    "Address must me more than 2 characters",
                            },
                        })}
                    />
                    {errors.address && (
                        <FormFieldError errorMessage={errors.address.message} />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="city">City</label>
                    <input
                        className="w-full"
                        id="city"
                        autoFocus
                        {...register("city", {
                            required: "Please enter city",
                        })}
                    />
                    {errors.city && (
                        <FormFieldError errorMessage={errors.city.message} />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="postalcode">Postal Code</label>
                    <input
                        className="w-full"
                        id="postalcode"
                        autoFocus
                        {...register("postalcode", {
                            required: "Please enter postalcode",
                        })}
                    />
                    {errors.postalcode && (
                        <FormFieldError
                            errorMessage={errors.postalcode.message}
                        />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="state">State</label>
                    <input
                        className="w-full"
                        id="state"
                        autoFocus
                        {...register("state", {
                            required: "Please enter state",
                        })}
                    />
                    {errors.postalcode && (
                        <FormFieldError errorMessage={errors.state.message} />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="country">Country</label>
                    <input
                        className="w-full"
                        id="country"
                        autoFocus
                        {...register("country", {
                            required: "Please enter country",
                        })}
                    />
                    {errors.postalcode && (
                        <FormFieldError errorMessage={errors.country.message} />
                    )}
                </div>

                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </Layout>
    );
}

export default ShippingPage;
