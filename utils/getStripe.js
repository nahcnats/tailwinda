import { loadStripe } from "@stripe/stripe-js";

let stripPromise;

const getStripe = () => {
    if (!stripPromise) {
        stripPromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
    }

    return stripPromise;
};

export default getStripe;
