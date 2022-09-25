import React from 'react';

const ModalLayout = ({ children, shown, control }) => {
    const handleBackdrop = () => {
        control(false)
    }
    return shown ? (
        <div onClick={handleBackdrop}>

            <div className='antialiased bg-gray-900/20 text-gray-900 font-sans overflow-x-hidden fixed top-0 left-0 w-full h-full ml-0 mr-0' >
                <div className='relative px-4 min-h-screen flex items-center justify-center'>
                    <div className='bg-black opacity-25 w-full h-full absolute z-10 inset-0'></div>
                    <div className='bg-white rounded-lg max-w-lg px-4 py-8 inset-x-0 bottom-0 z-50' onClick={e => e.stopPropagation()} >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalLayout;