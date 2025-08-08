'use client'

import { useState, useRef } from "react";
import {
    useFloating,
    offset,
    flip,
    shift,
    arrow,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
} from "@floating-ui/react";
import React from "react";


interface PropsOverlay{
    label?: string | (() => React.ReactNode);
    children : React.ReactNode;
    buttonClassName?: string;
    panelClassName?: string;
}

export default function Overlay({ label , children, buttonClassName, panelClassName } : PropsOverlay) {

    const [open, setOpen] = useState(false);
    const arrowRef = useRef(null);

    const { refs, floatingStyles, middlewareData, context, placement } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom",
        middleware: [
            offset(12),
            flip(),
            shift({ padding: 8 }),
            arrow({ element: arrowRef }),
        ],
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context),
    ]);

    const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    }[placement.split("-")[0]];


    const labelButton = () => {

        if(label && typeof label === "function"){
            return label();
        }

        if(label && typeof label === "string"){
            return label;
        }

        return null;
    }

    return (
        <React.Fragment>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={`cursor-pointer ${buttonClassName}`}>
                { labelButton() ?? "Overlay"}
            </button>

            {open && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className={`z-50 bg-white p-4 rounded-lg shadow-xl max-w-xs animate-in fade-in-0 zoom-in-95 transition-all duration-300 ${panelClassName}`}>
                        <div className="text-sm text-gray-800">
                           { children }
                        </div>

                        {/* Arrow */}
                        <div
                            ref={arrowRef}
                            className="absolute bg-white w-3 h-3 rotate-45 shadow-md"
                            style={{
                                left: middlewareData.arrow?.x ?? "",
                                top: middlewareData.arrow?.y ?? "",
                                [staticSide as any]: "-0.4rem",
                            }}
                        />
                    </div>
                </FloatingPortal>
            )}
        </React.Fragment>
    );
}
