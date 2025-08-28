import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
    size?:number
    rating: number; // 0 - 5, bisa pecahan
}

export default function StarRating({ rating, size = 20 }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => {
                const index = i + 1;
                if (index <= Math.floor(rating)) {
                    // bintang penuh
                    return <FaStar key={i} className="text-yellow-400" size={size} />;
                } else if (index - rating <= 0.5 && index > rating) {
                    // setengah bintang
                    return <FaStarHalfAlt key={i} className="text-yellow-400" size={size} />;
                } else {
                    // bintang kosong
                    return <FaRegStar key={i} className="text-yellow-400" size={size} />;
                }
            })}
        </div>
    );
}
