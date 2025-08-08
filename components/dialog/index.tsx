import { useEffect, useRef } from "react";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    accept?: () => void;
    reject?: () => void;
}

export default function Dialog({ open, onClose, title, children, accept, reject }: DialogProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md slide-up zoom-in-95 duration-300"
                role="dialog"
                aria-modal="true">
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                <div className="mb-4">{children}</div>

                <div className="w-full flex justify-end">
                    <div className="flex space-x-3 items-center">
                        <button
                            type="button"
                            onClick={reject}
                            className="cursor-pointer mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            No
                        </button>
                        <button
                            onClick={accept}
                            type="button"
                            className="cursor-pointer mt-2 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
