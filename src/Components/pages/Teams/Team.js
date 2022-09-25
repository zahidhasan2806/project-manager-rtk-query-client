import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useDeleteTeamMutation } from '../../../features/teams/teamsApi';
import AddMemberToTeam from '../../../modals/AddMemberToTeam';
const Team = ({ team }) => {

    const { name, title, createdAt, members, id, author, color } = team || {};
    const [showMenu, setShowMenu] = useState(false);
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

    const control = (value) => {
        setShowAddMemberForm(value);
    };

    const handleBackdrop = () => {
        if (showMenu) {
            setShowMenu(!showMenu)
        } if (showAddMemberForm) {
            setShowAddMemberForm(!showAddMemberForm)
        }

    }

    const handleDeleteTeam = () => {
        if (author.email !== loggedInUserEmail) {
            setDeleteError(true);
            setTimeout(() => {
                setDeleteError(false);
            }, 3000);

            return;
        }

        deleteTeam({ id, email: loggedInUserEmail });
        setShowMenu(false);
    };
    if (deleteError) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: " Only author can delete team",
        })
    }


    return (
        <div onClick={handleBackdrop}>


            <div
                className='relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100'
                draggable='true'>
                <button
                    className='absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'
                    onClick={() => setShowMenu(!showMenu)}>
                    <svg
                        className='w-4 h-4 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                    </svg>
                </button>
                <span
                    className={`flex items-center h-6 px-3 text-xs font-semibold ${color === "green" ? "bg-green-200 text-green-600" : color === 'red' ? "bg-red-200 text-red-600" : color === 'yellow' ? "bg-yellow-200 text-yellow-600" : color === 'gray' ? "bg-gray-200 text-gray-600" : color === 'blue' ? "bg-blue-200 text-blue-600" : null} rounded-full`}>
                    {name}
                </span>
                <div className='members mt-2 flex items-center flex-wrap'>
                    {members.map((member, idx) => {
                        return (
                            <div
                                className='member uppercase w-8 h-8 rounded-full text-center leading-8 bg-orange-300 mr-1'
                                key={idx}>
                                {member?.split('@')[0].slice(0, 2)}
                            </div>
                        );
                    })}
                </div>
                <h4 className='mt-3 text-sm font-medium'>{title}</h4>
                <div className='flex items-center w-full mt-3 text-xs font-medium text-gray-400'>
                    <div className='flex items-center'>
                        <svg
                            className='w-4 h-4 text-gray-300 fill-current'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                                fillRule='evenodd'
                                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span className='ml-1 leading-none'>{moment(createdAt).format('MMM Do YY')}</span>
                    </div>
                </div>
                {showMenu && (
                    <>
                        <div className='bg-white border rounded p-2 border-gray-500 border-opacity-75 absolute right-2 top-2' onClick={e => e.stopPropagation()}>
                            <button
                                className=' bg-green-500  text-white font-bold px-1 my-2  rounded block'
                                onClick={() => control(true)}>
                                Add member
                            </button>
                            <button
                                className='bg-red-500  text-white font-bold  my-2    px-1 rounded'
                                disabled={isLoading}
                                onClick={handleDeleteTeam}
                            >
                                Delete Team
                            </button>
                        </div>
                    </>
                )}


                {showAddMemberForm && <AddMemberToTeam setShowMenu={setShowMenu} control={control} members={members} teamId={id} shown={showAddMemberForm} />}
            </div>
        </div>
    );
};

export default Team;