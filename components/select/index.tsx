'use client'
import classNames from 'classnames';
import Select, { Props as ReactSelectProps, ClassNamesConfig, StylesConfig } from 'react-select'

export interface SelectOptionProps extends ReactSelectProps {
    sizeMode ?: "md" | "sm" | "lg"
};

const customClassNames: ClassNamesConfig = {
    control: ({ isFocused }: any) =>
        `border py-2 shadow px-2 py-1 ${isFocused ? "border-blue-600/20 ring-1 ring-blue-300" : "border-gray-300"}`,
    option: ({ isFocused, isSelected }: any) =>
        `px-3 py-3 cursor-pointer ${isSelected ? "bg-blue-600/20 text-white" : isFocused ? "bg-blue-100" : "bg-white"
        }`,
    menu: () => "mt-1 border border-gray-300 rounded-md shadow-lg bg-white z-50",
    placeholder: () => "text-gray-400",
    singleValue: () => "text-gray-800",
};


const SelectOption: React.FC<SelectOptionProps> = ({ sizeMode = "md", ...props }) => {

    const classStyleOption = classNames({
        "10px" : sizeMode === "md",
        "14px" : sizeMode === "lg",
        "6px" : sizeMode === "sm"
    })

    const stylesConfig: StylesConfig = {
        control(base, props) {
            return {
                ...base,
                borderRadius: 9,
                padding: classStyleOption
            }
        },
    }

    return (
        <Select
            {...props}
            styles={stylesConfig}
            classNames={customClassNames}
        />
    )
};

export default SelectOption;