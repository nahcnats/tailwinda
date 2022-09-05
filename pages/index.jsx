import Layout from "../components/common/Layout";
import ProductItem from "../components/product/ProductItem";
// import data from "../utils/data";
import db from "../utils/db";
import Product from "../models/Product";

function HomePage({ products }) {
    // const products = data.products;

    return (
        <Layout title="Home" carousel>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductItem key={product.slug} product={product} />
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    await db.connect();

    const products = await Product.find().lean();

    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}

export default HomePage;
