import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../../../features/teams/teamsApi';
import AddNewTeamModal from '../../../modals/AddNewTeamModal';
import Error from '../../../ui/Error';
import Loader from '../../../ui/Loader';
import Layout from '../../ui/Layout';
import Team from './Team';

const Teams = () => {
    const [showModal, setShowModal] = useState(false);


    const { user } = useSelector((state) => state.auth);
    const { data: teams, isLoading, isSuccess, isError } = useGetTeamsQuery(user.email);


    const control = (value) => {
        setShowModal(value);
    };






    let content = null;
    if (isLoading) content = <Loader message='Loading assigned teams...' />;
    if (!isLoading && isError) content = <Error message='some thing went wrong' />;
    if (!isLoading && !isError && teams.length === 0) content = <p>You are not assigned to any team!!</p>;
    if (!isLoading && isSuccess && teams.length) content = teams.map((team) =>
        <Team key={team.id} team={team}


        />);

    return (
        <div >
            <Layout>
                <div className='px-10 mt-6 flex justify-between'>
                    <h1 className='text-2xl font-bold'>Teams</h1>
                    <button
                        className='flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'
                        onClick={() => control(!showModal)}>
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
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto'>
                    {content}
                </div>

                {showModal && <AddNewTeamModal control={control} shown={showModal} />}
            </Layout>
        </div>
    );
};

export default Teams;