import React, { useState, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactStars from "react-stars";
import cn from "../../utils/cssClassIncludes";
import { Store } from "../../context/Store";

function ProductItem({ product }) {
    const { state, dispatch } = useContext(Store);

    const BlurImage = useCallback(
        ({ image, name, slug }) => {
            const [isLoading, setIsLoading] = useState(true);

            return (
                <Link href={`/product/${slug}`} passHref>
                    <a>
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded shadow xl:aspect-w-7 xl:aspect-h-8">
                            <Image
                                src={image}
                                alt={name}
                                layout="fill"
                                objectFit="cover"
                                className={cn(
                                    "duration-700 ease-in-out group-hover:opacity-75",
                                    isLoading
                                        ? "scale-110 blur-2xl grayscale"
                                        : "scale-100 blur-0 grayscale-0"
                                )}
                                onLoadingComplete={() => setIsLoading(false)}
                            />
                        </div>
                    </a>
                </Link>
            );
        },
        [product]
    );

    function addToCartHandler() {
        const existItem = state.cart.cartItems.find(
            (x) => x.slug === product.slug
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            alert("Sorry. Product is out of stock");
            return;
        }

        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    }

    return (
        <div className="card">
            <BlurImage
                image={product.image}
                name={product.name}
                slug={product.slug}
            />

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`} passHref>
                    <a>
                        <h2 className="text-lg">{product.name}</h2>
                    </a>
                </Link>
                <p>
                    <ReactStars
                        count={5}
                        value={product.rating}
                        size={20}
                        color2={"#ffd700"}
                        half
                        edit={false}
                    />
                </p>
                <p className="mb-2">{product.brand}</p>
                <p className="mb-2">RM {product.price}</p>
                <button
                    className="primary-button"
                    type="button"
                    onClick={() => addToCartHandler(product.slug)}
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
