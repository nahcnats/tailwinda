import React, { useEffect, useRef } from "react";

function Loading({ isVisible }) {
    const overLayRef = useRef();
    const loadingRef = useRef();

    useEffect(() => {
        if (!isVisible) {
            setTimeout(() => {
                loadingRef.current?.classList.add("opacity-0");
            }, 100);

            setTimeout(() => {
                overLayRef.current?.classList.add("hidden");
            }, 300);
        } else {
            overLayRef.current?.classList.remove("hidden");

            setTimeout(() => {
                loadingRef.current?.classList.remove("opacity-0");
            }, 100);
        }
    }, [isVisible]);

    return (
        <div
            ref={overLayRef}
            className="fixed left-0 top-0 z-20 flex h-screen w-screen bg-[rgba(0,0,0,0.6)]"
        >
            <div className="relative flex flex-1 flex-col items-center justify-center">
                <div
                    ref={loadingRef}
                    class="flex flex-col items-center justify-center "
                >
                    <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-200"></div>
                    <div className="mt-4 text-lg text-gray-100">Loading...</div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
