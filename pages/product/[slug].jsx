import React, { useContext, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/common/Layout';
import Empty from '../../components/common/Empty';
import { Store } from '../../context/Store';
import cn from '../../utils/cssClassIncludes';

import data from '../../utils/data';

function ProductPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug);
    const [isLoading, setIsLoading] = useState(true);

    if (!product) {
        return (
            <Empty message='Product Not Found!' actionMessage='back to products' />
        );
    }

    function addToCartHandler() {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            alert('Sorry. Product is out of stock');
            return;
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    }

    return (
        <Layout title={ product.name }>
            <div className='py-2'>
                <Link href='/' passHref>
                    <a>back to products</a>
                </Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout='responsive'
                        className={cn(
                            'duration-700 ease-in-out group-hover:opacity-75',
                            isLoading
                                    ? 'scale-110 blur-2xl grayscale'
                                    : 'scale-100 blur-0 grayscale-0'
                        )}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{ product.name }</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>RM {product.price}</div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button
                            className='primary-button w-full'
                            onClick={addToCartHandler}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductPage;