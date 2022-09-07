import dbConnect from "../../utils/db";
import User from "../../models/User";
import Product from "../../models/Product";
import data from "../../utils/data";

async function handler(req, res) {
    await dbConnect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    res.send({ message: "seeded successfully" });
}

export default handler;
