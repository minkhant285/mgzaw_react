import React from 'react';

interface ProgressBarProps {
    progress: number; // Value between 0 and 100
    className?: string; // Optional custom class name
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
    return (
        <div className={`relative w-full bg-gray-200 rounded-full h-4 ${className}`}>
            <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
