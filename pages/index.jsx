import React from "react";
import Layout from "../components/common/Layout";
import ProductItem from "../components/product/ProductItem";
// import data from "../utils/data";
import db from "../utils/db";
import Product from "../models/Product";
import Carousel from "../components/common/Carousel";

function HomePage({ products }) {
    // const products = data.products;

    return (
        <>
            <Layout title="Home">
                <div className="mb-5 -mt-4 hidden md:block">
                    <Carousel
                        images={["/images/banner1.jpg", "/images/banner2.jpg"]}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductItem key={product.slug} product={product} />
                    ))}
                </div>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    await db.connect();

    const products = await Product.find().lean();

    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}

export default HomePage;
