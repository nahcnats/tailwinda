import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Store } from '../context/Store';
import Layout from '../components/common/Layout';
import Empty from '../components/common/Empty';
import { XCircleIcon } from '@heroicons/react/24/outline';


function CartPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    function removeItemHandler(item) {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }

    if (cartItems.length === 0) {
        return (
            <Empty message='Cart is empty' actionMessage='Go shopping' />
        )
    }

    return (
        <Layout title='Shopping Cart'>
            <h1 className='mb-4 text-xl'>Shopping Cart</h1>
            <div className='grid md:grid-cols-4 md:gap-5'>
                <div className='overflow-x-auto md:col-span-3'>
                    <table className='min-w-full'>
                        <thead className='border-b'>
                            <tr>
                                <th className='px-5 text-left'>Item</th>
                                <th className='p-5 text-right'>Quantity</th>
                                <th className='p-5 text-right'>Price</th>
                                <th className='p-5'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item) => (
                                    <tr key={item.slug} className='border-b'>
                                        <td>
                                            <Link href={`/product/${item.slug}`} passHref>
                                                <a className='flex items-center'>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td className='text-right'>{item.quantity}</td>
                                        <td className='text-right'>RM {item.price}</td>
                                        <td className='p-5 text-center'>
                                            <button onClick={() => removeItemHandler(item)}>
                                                <XCircleIcon className='h-5 w-5' />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className='card p-5'>
                        <ul>
                            <li>
                                <div className='pb-3 text-xl'>
                                    {
                                        `Subtotal ( ${cartItems.reduce((a, c) => a + c.quantity, 0)} ) : RM ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}`
                                    }
                                </div>
                            </li>
                            <li>
                                <button className='primary-button w-full' onClick={() => router.push('/shipping')}>Check Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;