import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const params = {
                line_items: req.body.orderItems.map((item) => {
                    return {
                        price_data: {
                            currency: "myr",
                            product_data: {
                                name: item.name,
                                // image: null,
                            },
                            unit_amount: item.price * 100,
                        },
                        // adjustable_quantity: {
                        //     enabled: true,
                        //     minimum: 1,
                        // },
                        quantity: item.quantity,
                    };
                }),
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                success_url: `${req.headers.origin}/payment-status?success=true`,
                cancel_url: `${req.headers.origin}/?payment-status?canceled=true`,
            };

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).send(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}
