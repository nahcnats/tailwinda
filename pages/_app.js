
import { StoreProvider } from '../context/Store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    );
}

export default MyApp
