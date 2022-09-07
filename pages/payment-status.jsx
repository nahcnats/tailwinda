import React, { useEffect } from "react";
import JSConfetti from "js-confetti";
import { useRouter } from "next/router";
import Layout from "../components/common/Layout";

function PaymentStatusPage() {
    const router = useRouter();
    const { query } = router;
    const jsConfetti = new JSConfetti();

    useEffect(() => {
        let timeOutId = setTimeout(() => {
            if (query.success) {
                jsConfetti.addConfetti();
            }

            router.push("/");
        }, 3000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [query]);

    return (
        <Layout title="Payment Status">
            <div className="flex h-[85vh] flex-col items-center justify-center">
                {query.success ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="alert-success">
                            <h1 className="text-xl font-bold">
                                Payment Successfull!
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="alert-error">
                            <h1 className="text-xl font-bold">
                                Payment Cancelled!
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default PaymentStatusPage;
