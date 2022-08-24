import React from 'react';
import Link from 'next/link';
import Layout from './Layout';

function Empty({ message, actionMessage }) {
    return (
        <Layout>
            <div className='flex flex-col h-screen justify-center items-center'>
                <h1 className='font-bold'>{message}</h1>
                <p>
                    <Link href='/' passHref><a>{actionMessage}</a></Link>
                </p>
            </div>
        </Layout>
    );
}

export default Empty;