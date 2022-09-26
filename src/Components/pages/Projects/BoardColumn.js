import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProjectsQuery } from '../../../features/projects/projectsApi';
import { setAssignedProjectsQuery } from '../../../features/projects/projectsSlice';
import { useGetTeamsQuery } from '../../../features/teams/teamsApi';
import AddNewProjectModal from '../../../modals/AddNewProjectModal';
import Error from '../../../ui/Error';
import Loader from '../../../ui/Loader';
import ColumnLayout from './ColumnLayout';

const BoardColumn = () => {
    const [isSkip, setIsSkip] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();
    const { email: loggedInUserEmail } = useSelector((state) => state?.auth?.user) || {};
    const { assignedProjectsQuery } = useSelector((state) => state.projects);

    //fetch Assign project
    const {
        data: projects,
        isSuccess,
        isError,
        isLoading,
    } = useFetchProjectsQuery(
        { assignedProjectsQuery },
        {
            skip: isSkip,
            refetchOnMountOrArgChange: true,
        }
    );
    const { data: teams, isLoading: teamsLoading, isSuccess: teamsLoadingSuccess } = useGetTeamsQuery(loggedInUserEmail);

    //set assigned Teams query to store
    useEffect(() => {
        if (!teamsLoading && teamsLoadingSuccess && teams?.length) {
            let assignedTeamsQuery = teams?.map((team) => `team=${team.name.toLowerCase()}`).join('&');
            dispatch(setAssignedProjectsQuery(assignedTeamsQuery));
            setIsSkip(false);
        }
    }, [teams, teamsLoading, teamsLoadingSuccess, dispatch]);

    let transformedProjects = projects?.map((project) => {
        for (let { name, color } of teams) {
            if (name === project.team) {
                project = { ...project, color };
            }
        }
        return project;
    });

    const control = (value) => {
        setShowModal(value);
    };


    return (
        <div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
            {isLoading && <Loader message='loading...' />}
            {!isLoading && isError && <Error message='some thing went wrong' />}
            {!isError && isSuccess && (<>
                <ColumnLayout projects={transformedProjects} stage='Backlog' control={control} teams={teams} />
                <ColumnLayout projects={transformedProjects} stage='Ready' teams={teams} />
                <ColumnLayout projects={transformedProjects} stage='Doing' teams={teams} />
                <ColumnLayout projects={transformedProjects} stage='Review' teams={teams} />
                <ColumnLayout projects={transformedProjects} stage='Blocked' teams={teams} />
                <ColumnLayout projects={transformedProjects} stage='Done' teams={teams} />
            </>)}

            {showModal && <AddNewProjectModal control={control} teams={teams} shown={showModal} />}
        </div>


    );
};

export default BoardColumn;