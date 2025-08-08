
'use client'

import classNames from "classnames";
import React from "react";

interface PropsInputText extends React.InputHTMLAttributes<HTMLInputElement> {
    sizeMode?: "md" | "lg" | "sm";
    invalid?: boolean;
}

const InputText: React.FC<PropsInputText> = ({sizeMode = 'md', invalid, className,  ...props}) => {

    const classNamesInput = classNames({
        "p-4" : sizeMode === "md",
        "p-6" : sizeMode === "lg",
        "p-3" : sizeMode === "sm",
        "focus:outline-red-400/50 focus:border-red-400/70 shadow border-2 border-red-300" : invalid,
        "focus:outline-blue-600/20 focus:border-blue-400 shadow border border-gray-300" : !invalid,
    });

    return (
        <input
            {...props}
            className={`w-full focus:outline-3 ${classNamesInput} rounded-lg ${className}`} />
    )
};

export default InputText;