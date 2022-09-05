import React, { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../context/Store";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if (isSSR) return null;

    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <ThemeProvider attribute="class">
                    <Component {...pageProps} />
                </ThemeProvider>
            </StoreProvider>
        </SessionProvider>
    );
}

export default MyApp;
