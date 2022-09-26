import React from 'react';

const ReviewBoard = () => {
    return (
        <div className='flex flex-col flex-shrink-0 w-64'>
            <div className='flex items-center flex-shrink-0 h-10 px-2'>
                <span className='block text-sm font-semibold'>Review</span>
                <span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
                    3
                </span>

            </div>
        </div>
    );
};

export default ReviewBoard;