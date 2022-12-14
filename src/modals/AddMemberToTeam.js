import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../features/users/usersApi';
import AsyncSelect from 'react-select/async'
import ModalLayout from './ModalLayout';
import { useUpdateTeamMutation } from '../features/teams/teamsApi';
import { debounce } from '../utils/utils';


const AddMemberToTeam = ({ shown, teamId, setShowAddMemberForm, members, setShowMenu }) => {
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
    const { data: users, isSuccess: getUsersSuccess } = useGetUsersQuery();
    const [selectedMember, setSelectedMember] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updatedTeam] = useUpdateTeamMutation();
    const [defaultOptions, setDefaultOptions] = useState([]);

    //load option
    const loadOption = async (inputValue, callback) => {
        if (getUsersSuccess) {
            let loaderUsers = users
                .map((user) => ({ label: user.email.toLowerCase(), value: user.email.toLowerCase() }))
                .filter((option) => option.label.toLowerCase().includes(inputValue));
            callback(loaderUsers);
        }
    };

    //handle option change
    const handleChange = (member) => {
        setSelectedMember(member);

        //check only members can add new member
        if (!members.includes(loggedInUserEmail)) {
            setError(true);
            setErrorMessage('Only members can add new member');
            return;
        }

        //exist member
        if (members.includes(member.value)) {
            setError(true);
            setErrorMessage('Member already exist');
        } else {
            setError(false);
            setErrorMessage('');
        }
    };

    //set default options
    useEffect(() => {
        if (getUsersSuccess) {
            setDefaultOptions(
                users
                    .filter((u) => !members.includes(u.email))
                    .map((user) => ({ label: user.email.toLowerCase(), value: user.email.toLowerCase() }))
                    .slice(0, 3)
            );
        }
    }, [getUsersSuccess, setDefaultOptions, members, users]);

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();
        //handle empty value
        if (!selectedMember?.value?.trim().length || members.includes(selectedMember?.value)) return;
        updatedTeam({ id: teamId, members: [...members, selectedMember?.value] });
        setShowAddMemberForm(false);
        setShowMenu(false)
    };
    const cancelModal = () => {
        setShowAddMemberForm(false)
        setShowMenu(false)
    }

    return (
        <ModalLayout control={setShowAddMemberForm} shown={shown} >
            <form onSubmit={handleSubmit} className='w-96' >
                <AsyncSelect
                    noOptionsMessage={() => 'not found'}
                    defaultOptions={defaultOptions}
                    backspaceRemovesValue={true}
                    loadingMessage={() => 'searching...'}
                    loadOptions={debounce(loadOption, 500)}
                    hideSelectedOptions={true}
                    placeholder='Type email'
                    isSearchable={true}
                    onChange={handleChange}
                    className='text-xs'
                />
                {error && <p className='text-xs leading-xs text-red-800'>{errorMessage}</p>}
                <div className='text-center text-right mt-2 flex'>
                    <button
                        className='inline-block w-auto px-2 py-1 py-2 bg-green-300 rounded font-semibold text-sm order-1 text-xs leading-3'
                        type='submit'>
                        Add
                    </button>
                    <button
                        className='ml-2 inline-block w-auto px-2 py-1 py-1 bg-red-300 rounded font-semibold text-sm order-1 text-xs leading-3'
                        type='button'
                        onClick={cancelModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};

export default AddMemberToTeam;