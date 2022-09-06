import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "./Layout";

function Error({ message }) {
    const router = useRouter();

    return (
        <Layout>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                    {message}
                </div>
                <button onClick={() => router.back()}>Go back</button>
            </div>
        </Layout>
    );
}

export default Error;
