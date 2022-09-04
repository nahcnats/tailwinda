import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/common/Layout";

function Unauthorized() {
    const router = useRouter();
    const { message } = router.query;

    return (
        <Layout title="Unauthorized">
            <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-xl">Access Denied</h1>
                {message && <div className="mb-4 text-red-500">{message}</div>}
            </div>
        </Layout>
    );
}

export default Unauthorized;
