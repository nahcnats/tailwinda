import Product from "../../../models/Product";
import dbConnect from "../../../utils/db";

async function handler(req, res) {
    await dbConnect();
    const product = await Product.findById(req.query.id);
    res.send(product);
}

export default handler;
