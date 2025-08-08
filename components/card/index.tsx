import classNames from "classnames";
import React from "react";

export interface PropsCard {
    className?: string;
    bodyClassName?: string;
    children?: React.ReactNode;
    headerTemplate?: () => React.ReactNode | string;
    footerTemplate?: () => React.ReactNode | string;
};

const Card: React.FC<PropsCard> = ({ children, className, headerTemplate, bodyClassName, footerTemplate }) => {

    const classNamesCard = classNames({}, className);

    const headerCard = () => {

        if (headerTemplate || typeof headerTemplate === "function") {
            return headerTemplate();
        }

        if (headerTemplate || typeof headerTemplate === "string") {
            <div className="border-b px-4 py-4">
                { headerTemplate }
            </div>
        }
        
        return null;
    };

    const bodyCard = () => {
        return (
            <div className={`px-4 py-3 ${bodyClassName}`}>
                {children}
            </div>
        )
    };

    const footerCard = () => {

        if (footerTemplate || typeof footerTemplate === "function") {
            return (
                <div className="border-t px-4 py-4">
                    {footerTemplate()}
                </div>
            )
        }

        if (footerTemplate || typeof footerTemplate === "string") {
            return (
                <div className="border-t px-4 py-4">
                    {footerTemplate}
                </div>
            )
        };

        return null;
    };

    return (
        <div className={`min-w-10 shadow-xl rounded-lg ${classNamesCard}`}>
            {
                headerCard && (
                    <div id="header">
                        {headerCard()}
                    </div>
                )
            }

            {bodyCard()}

            {
                footerCard && (
                    <div id="footer">
                        {footerCard()}
                    </div>
                )
            }
        </div>
    )
}

export default Card;