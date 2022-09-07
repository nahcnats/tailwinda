import { getSession } from "next-auth/react";
import dbConnect from "../../../utils/db";
import Order from "../../../models/Order";

async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send("sign in required");
    }

    const { user } = session;
    await dbConnect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
}

export default handler;
