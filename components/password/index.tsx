'use client'

import classNames from "classnames";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface PropsInputText extends React.InputHTMLAttributes<HTMLInputElement> {
    sizeMode?: "md" | "lg" | "sm";
    invalid?: boolean;
}

const InputPassword: React.FC<PropsInputText> = ({ sizeMode, invalid, className, ...props }) => {

    const [showPass, setShowPass] = useState<boolean>(false);
    
    const classNamesInput = classNames({
        "p-4": sizeMode === "md",
        "p-6": sizeMode === "lg",
        "p-3": sizeMode === "sm",
        "focus:outline-red-400/50 focus:border-red-400/70 shadow border-2 border-red-300": invalid,
        "focus:outline-blue-600/20 focus:border-blue-400 shadow border border-gray-300": !invalid,
    });

    return (
        <div className="inline-block relative w-full">
            <input
                {...props}
                type={showPass ? "text" : "password"}
                className={`w-full focus:outline-3 ${classNamesInput} rounded-lg ${className}`} />

            <span className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPass((show) => !show)}>
                {
                    showPass ? <BsEye size={18} /> : <BsEyeSlash size={18} />
                }
            </span>
        </div>
    )
}

export default InputPassword