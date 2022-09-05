import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";
import { ToastContainer } from "react-toastify";

function Layout({ title, children, carousel }) {
    const siteName = "Tailwinda";

    return (
        <>
            <Head>
                <title>{title ? `${title} - ${siteName}` : siteName}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position="bottom-center" limit={1} />

            <div className="flex min-h-screen flex-col justify-between">
                <Header />
                <main className="container m-auto mt-4 px-4">{children}</main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
