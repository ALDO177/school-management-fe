
'use client'
import React from "react";
import { SidebarProps } from "../../types/sidebar";
import { BsBank2 } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export interface SidebarItemProps {
    data: Array<SidebarProps>;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ data }) => {

    const ItemSide = ({ item } : { item : SidebarProps}) => {

        const pathname = usePathname();
        const isActiveSelf = item.to && pathname.includes(item.to);

        const classNameActived = classNames({
            'bg-gray-50/20' : isActiveSelf
        });

        return (
            <li className={`w-full relative inline-block transition-all transform duration-300 hover:hover:bg-gray-50/20 px-3 py-4 text-white ${classNameActived}`}>
                <Link href={item?.to ?? "#"}>
                    <div className="flex items-center space-x-3">
                        {item.icon ? item.icon : <BsBank2 size={22} />}
                        <span className="text-lg">{item.label}</span>
                    </div>
                </Link>

                <div className={`absolute top-0 right-0 transition-all transform duration-300 bg-white ${ isActiveSelf ? "w-1 h-full" : "w-0"}`}></div>
            </li>
        )
    };

    return (
        <React.Fragment>
            {
                data.map((item, idx) => (
                    <ItemSide key={idx} item={item} />
                ))
            }
        </React.Fragment>
    )
};

export default SidebarItem;