import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

let count = 0;

function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setInterval(() => {
            handleArrow("r");
        }, 3000);
    }, []);

    function handleArrow(direction) {
        if (direction === "l") {
            const imagesLength = images.length;
            count = (currentIndex + imagesLength - 1) % imagesLength;
            setCurrentIndex(count);
        }
        if (direction === "r") {
            count = (count + 1) % images.length;
            setCurrentIndex(count);
        }
    }

    const ArrowContainer = ({ children, ...props }) => {
        return (
            <button
                className="absolute top-0 bottom-0 z-10 m-auto h-[20%] px-2 text-[30px] font-bold text-white"
                {...props}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="relative -ml-[97px] h-[300px] w-screen overflow-hidden bg-gray-200">
            <ArrowContainer
                style={{ left: 0 }}
                onClick={() => handleArrow("l")}
            >
                <AiOutlineLeft />
            </ArrowContainer>
            <div className="flex w-screen transition duration-700 ease-in-out md:h-full">
                <div className="aspect-auto">
                    <Image
                        src={images[currentIndex]}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
            <ArrowContainer
                style={{ right: 0 }}
                onClick={() => handleArrow("r")}
            >
                <AiOutlineRight />
            </ArrowContainer>
        </div>
    );
}

export default Carousel;
