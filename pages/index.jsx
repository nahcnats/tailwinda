import Layout from "../components/layout/Layout";
import ProductItem from "../components/product/ProductItem";
import data from '../utils/data';

function Home() {
    return (
        <Layout title='Home'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {data.products.map((product) => <ProductItem key={ product.slug } product={ product } />)}
            </div>
        </Layout>
    );
}

export default Home;