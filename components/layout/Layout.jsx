import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

function Layout({ title, children }) {
    const siteName = 'Tailwinda';

    return (
        <>
            <Head>
                <title>{ title ? `${title} - ${siteName}` : siteName }</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            

            <div className='flex min-h-screen flex-col justify-between'>
                <Header />
                <main className='container m-auto mt-4 px-4'>
                    { children }
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;