import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useAddNewProjectMutation } from '../features/projects/projectsApi';
import ModalLayout from './ModalLayout';

const AddNewProjectModal = ({ control, shown, teams }) => {
    const [formData, setFormData] = useState({ team: '', title: '' });
    const [addNewProject, { isLoading }] = useAddNewProjectMutation();
    const { email: loggedInUserEmail, avatar } = useSelector((state) => state.auth.user);

    const handleChange = (e) => {
        let target = e.target;
        setFormData({ ...formData, [target.name]: target.value });
    };
    const options = teams?.map((team) => ({ label: team.name, value: team.name }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() && formData.team.trim()) {
            addNewProject({
                author: loggedInUserEmail,
                team: formData?.team.toLowerCase(),
                title: formData?.title,
                avatar: avatar,
                stage: 'backlog',
                createdAt: new Date(),
            });
            setFormData({ team: '', title: '', avatar: '' });
            control(false);
        }
    };

    return (
        <ModalLayout control={control} shown={shown}>
            <form onSubmit={handleSubmit} className="w-96">
                <Select
                    placeholder={'Select team'}
                    options={options}
                    noOptionsMessage={() => 'your not assigned to this team or team not exist'}
                    isSearchable={true}
                    onChange={(selectedOption) => setFormData({ ...formData, team: selectedOption.value })}
                />

                <input className="w-full border border-gray-500 rounded focus:outline-none my-1 p-2 text-black"
                    type='text'
                    placeholder='Title'
                    name='title'
                    required
                    onChange={handleChange}
                    value={formData?.title}
                />
                <div className='text-center text-right mt-4 flex'>
                    <button
                        className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
                        type='submit'>
                        Create
                    </button>
                    <button
                        className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
                        type='button'
                        disabled={isLoading}
                        onClick={() => control(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};

export default AddNewProjectModal;