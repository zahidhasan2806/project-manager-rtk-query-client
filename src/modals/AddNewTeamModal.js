import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddTeamMutation } from '../features/teams/teamsApi';
import SelectColorInput from '../ui/SelectColorInput';
import ModalLayout from './ModalLayout';

const AddNewTeamModal = ({ control, shown }) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [addTeam, { isLoading }] = useAddTeamMutation(user?.email);


    const options = [
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'gray', label: 'Gray' },
        { value: 'blue', label: 'Blue' }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && title.trim() && color.trim()) {
            addTeam({
                name: name.toLowerCase(),
                title,
                color,
                author: user,
                members: [user?.email],
                createdAt: new Date(),
            });
            control(false);
        }
    };
    return (
        <ModalLayout control={control} shown={shown}>
            <div className='text-center'>
                <h4>Add New Team</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <input className='w-full border border-gray-500 rounded focus:outline-none my-1 p-2 text-black' type='text' placeholder='Team Name' required onChange={(e) => setName(e.target.value)} />
                <input className='w-full border border-gray-500 rounded focus:outline-none my-1 p-2 text-black' type='text' placeholder='Description' required onChange={(e) => setTitle(e.target.value)} />
                {/* <input
                    className='w-full border border-gray-500 rounded focus:outline-none my-1 p-2 text-black'
                    type='text'
                    placeholder='write valid css color name(red)'
                    required
                    onChange={(e) => setColor(e.target.value)}
                /> */}
                {/* <Select
                    placeholder={'Select team'}
                    options={options}
                    isSearchable={false}
                    onChange={(selectedOption) => setColor(selectedOption.value)}
                /> */}
                <SelectColorInput setColor={setColor} />
                <div className='text-center text-right mt-4 flex'>
                    <button
                        className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
                        type='submit'
                        disabled={isLoading}>
                        Create
                    </button>
                    <button
                        className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
                        type='button'
                        onClick={() => control(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};

export default AddNewTeamModal;