import React from 'react';
import { useGetUsersQuery } from '../features/users/usersApi';
import ModalLayout from './ModalLayout';

const TeamMembersModal = ({ control, shown, members, teamName, color }) => {
    const { data: users, } = useGetUsersQuery();
    let matchedUsers = []
    const CheckingMatchingUser = users?.map((user) => {
        for (let member of members) {

            if (member === user.email) {
                matchedUsers.push(user)
            }
        } return matchedUsers
    })
    return (
        <ModalLayout control={control} shown={shown}>
            <div className='text-lg text-center font-medium'>
                <h1 className='font-bold'> Members Of <span
                    className={`${color === "green" ? "text-green-600" : color === 'red' ? "text-red-600" : color === 'yellow' ? "text-yellow-600" : color === 'gray' ? "text-gray-600" : color === 'blue' ? "text-blue-600" : null}`}>{teamName}</span> team</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-10 mt-4 gap-6 overflow-auto'>
                {
                    matchedUsers.map(matchedUser => <div key={matchedUser?.id} >

                        <div
                            className='flex flex-col items-start rounded-lg cursor-pointer  bg-white border rounded border-gray-500 border-opacity-75 min-h-max '>

                            <img className='object-cover h-40 w-80' src={matchedUser?.avatar ? matchedUser.avatar : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'} alt="User Avatar" />


                            <h1 className='mt-3 text-lg text-center font-medium'>{matchedUser?.name}</h1>
                        </div>
                    </div>)
                }

            </div>
        </ModalLayout>
    );
};

export default TeamMembersModal;