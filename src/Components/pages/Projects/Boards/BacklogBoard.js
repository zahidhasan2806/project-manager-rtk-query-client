import React from 'react';

const BacklogBoard = ({ projects: allProject, stage }) => {
    return (
        <>
            <div className='flex flex-col flex-shrink-0 w-64'>
                <div className='flex items-center flex-shrink-0 h-10 px-2'>
                    <span className='block text-sm font-semibold'>{stage}</span>
                    <span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
                        3
                    </span>
                    <button
                        className='flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                        </svg>
                    </button>
                </div>
                {/* <div
                    className={`flex flex-col pb-2 overflow-auto scrollbar min-h ${isOver && 'bg-indigo-300'}`}

                    style={{ minHeight: '80vh' }}>
                    {projects?.map((project) => (
                        <Project key={project.id} project={project} />
                    ))}
                </div> */}
            </div>
        </>
    );
};

export default BacklogBoard;