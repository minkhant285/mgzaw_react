import React, { ReactNode, MouseEvent } from 'react';
import { MdCancel } from "react-icons/md";

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
            className="fixed p-4 py-44 inset-0   z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={handleOverlayClick}
        >
            <div className='flex justify-center'>

                <div className="bg-tertiary rounded-lg shadow-lg p-1  max-w-lg mx-4 relative">
                    {/* <button
                        onClick={() => onClose()}
                        className="absolute top-2 right-2 text-[#fff]"
                    >
                        <MdCancel size={30} color='#fff' />
                    </button> */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
