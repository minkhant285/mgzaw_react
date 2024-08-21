import React, { ReactNode, MouseEvent } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-[#fff]"
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
