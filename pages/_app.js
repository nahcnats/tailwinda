import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../context/Store";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
