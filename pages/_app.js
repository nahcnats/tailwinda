import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../context/Store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </SessionProvider>
    );
}

export default MyApp;
