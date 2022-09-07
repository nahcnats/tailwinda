import { getSession } from "next-auth/react";
import dbConnect from "../../../../utils/db";
import Order from "../../../../models/Order";

async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send("sign in required");
    }

    await dbConnect();
    const order = await Order.findById(req.query.id);

    res.send(order);
}

export default handler;
