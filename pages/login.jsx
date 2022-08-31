import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "../components/common/Layout";
import { getError } from "../utils/error";

function LoginPage() {
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
        formState: { errors },
    } = useForm();

    async function submitHandler({ email, password }) {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    }

    return (
        <Layout title="Login">
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Login</h1>
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
                        autoFocus
                    />
                    {errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
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
                        autoFocus
                    />
                    {errors.password && (
                        <div className="text-red-500">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4">
                    Don&apos;t have an account? &nbsp;{" "}
                    <Link href="register">Register</Link>
                </div>
            </form>
        </Layout>
    );
}

export default LoginPage;
