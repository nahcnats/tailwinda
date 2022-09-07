import React from "react";
import Link from "next/link";
import Layout from "./Layout";

function Empty({ message, actionMessage }) {
    return (
        <Layout>
            <div className="flex h-[85vh] flex-col items-center justify-center">
                <h1 className="font-bold">{message}</h1>
                <p>
                    <Link href="/" passHref>
                        <a>{actionMessage}</a>
                    </Link>
                </p>
            </div>
        </Layout>
    );
}

export default Empty;
