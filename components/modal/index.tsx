// components/RefModal.tsx
import React, {
    useImperativeHandle,
    useState,
    useEffect,
    forwardRef,
    ReactNode,
} from "react";

export type RefModalHandle = {
    open: () => void;
    close: () => void;
    options : (options: OptionsCard) => void; 
};

type RefModalProps = {
    title?: string;
};

type OptionsCard = {
    cardclassName?: string;
    cardStyle?: React.CSSProperties;
    content ?: React.ReactNode | string;
    title?: string;
}

export const Modal = forwardRef<RefModalHandle, RefModalProps>(({ title }, ref) => {
    
    const [isOpen, setIsOpen]   = useState(false);
    const [options, setOption]  = useState<OptionsCard>({
        cardclassName: "w-full min-w-lg bg-white"
    });

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        options : (opions: OptionsCard) =>setOption(opions)
    }));

    useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", escHandler);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", escHandler);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div 
                style={{...options?.cardStyle}} 
                className={`relative ${options?.cardclassName} max-h-[90svh] overflow-y-scroll disabled-scrool rounded-md shadow-lg slide-up duration-500`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-200">
                    <h2 className="text-lg font-semibold">{options?.title}</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-red-600 text-2xl font-bold"
                        aria-label="Close">
                        &times;
                    </button>
                </div>
                {/* Content */}
                <div className="p-6">{options?.content}</div>
            </div>
        </div>
    );
});

Modal.displayName = "RefModal";

export default Modal;
