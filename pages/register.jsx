import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "../components/common/Layout";
import FormFieldError from "../components/common/FormFieldError";
import { getError } from "../utils/error";

function RegisterPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || "/");
        }
    }, [router, session, redirect]);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    async function submitHandler({ name, email, password }) {
        try {
            await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
            }
        } catch (e) {
            toast.error(getError(e));
        }
    }

    return (
        <Layout title="Register">
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Create Account</h1>
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        {...register("name", {
                            required: "Please enter name",
                        })}
                        type="text"
                        className="w-full"
                        id="name"
                        autoFocus
                    />
                    {errors.name && (
                        <FormFieldError errorMessage={errors.email.message} />
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email", {
                            required: "Please enter email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Please enter valid email",
                            },
                        })}
                        type="email"
                        className="w-full"
                        id="email"
                    />
                    {errors.email && (
                        <FormFieldError errorMessage={errors.email.message} />
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        {...register("password", {
                            required: "Please enter password",
                            minLength: {
                                value: 6,
                                message: "password is more than 5 chars",
                            },
                        })}
                        type="password"
                        className="w-full"
                        id="password"
                    />
                    {errors.password && (
                        <FormFieldError
                            errorMessage={errors.password.message}
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === getValues("password"),
                            minLength: {
                                value: 6,
                                message: "password is more than 5 chars",
                            },
                        })}
                        type="password"
                        className="w-full"
                        id="confirmPassword"
                    />
                    {errors.confirmPassword && (
                        <FormFieldError
                            errorMessage={errors.confirmPassword.message}
                        />
                    )}
                    {errors.confirmPassword &&
                        errors.confirmPassword.type === "validate" && (
                            <div className="text-red-500">
                                Password do not match
                            </div>
                        )}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Register</button>
                </div>
                <div className="mb-4">
                    Already have an account? &nbsp;{" "}
                    <Link
                        href={`/login?redirect=${redirect || "/login"}`}
                        passHref
                    >
                        <a>Login</a>
                    </Link>
                </div>
            </form>
        </Layout>
    );
}

export default RegisterPage;
