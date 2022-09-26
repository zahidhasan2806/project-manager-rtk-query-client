import moment from 'moment';
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useDeleteProjectMutation } from '../../../features/projects/projectsApi';

const Project = ({ project, teams }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [deleteProject, { isLoading }] = useDeleteProjectMutation();
    const { team: teamName, title, createdAt, stage, id, author, match, avatar } = project;
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

    let fetchedTeam = (teams.filter(t => t?.name?.toLowerCase() === teamName));
    const color = fetchedTeam[0]?.color

    const handleDeleteProject = () => {
        if (loggedInUserEmail !== author) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: " Only author can delete team",
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteProject({ id });
                }
            })
        }



        ;
    }
    // dnd
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { id, stage },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const handleBackdrop = () => {
        if (showMenu) {
            setShowMenu(!showMenu)


        }
    }

    return (
        <div
            className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${match && 'border-2 border-indigo-600'
                }  ${isDragging ? 'opacity-50' : null}`}
            draggable='true'
            ref={drag} onClick={handleBackdrop}>
            {stage === 'backlog' && (
                <>
                    <button
                        className='absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex' onClick={() => setShowMenu(!showMenu)}>
                        <svg
                            className='w-4 h-4 fill-current'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                        </svg>
                    </button>
                    {showMenu && (
                        <div className='bg-white border rounded p-2 border-gray-500 border-opacity-75 absolute right-2 top-2' onClick={e => e.stopPropagation()}>

                            <button
                                className='bg-green-500  text-white font-bold px-1 my-2  rounded block'
                                onClick={handleDeleteProject}>
                                Delete
                            </button>
                        </div>
                    )}

                </>
            )}

            <span
                className={`flex items-center h-6 px-3 text-xs font-semibold ${color === "green" ? "bg-green-200 text-green-600" : color === 'red' ? "bg-red-200 text-red-600" : color === 'yellow' ? "bg-yellow-200 text-yellow-600" : color === 'gray' ? "bg-gray-200 text-gray-600" : color === 'blue' ? "bg-blue-200 text-blue-600" : null} rounded-full`}>
                {teamName}
            </span>
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
                <img
                    className='w-6 h-6 ml-auto rounded-full'
                    src={
                        avatar
                            ? avatar
                            : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                    alt=''
                />
            </div>
        </div>
    );
};

export default Project;