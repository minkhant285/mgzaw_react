import React from 'react';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
    const progress = Math.min(Math.max(value, 0), 100); // Ensures value is between 0 and max

    return (
        <div className="relative w-full bg-secondary rounded-full h-4">
            <div
                className="bg-primary h-4 rounded-full"
                style={{ width: `${(progress / 100) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-sm text-white">
                    {Math.floor((progress / 100) * 100)}%
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
