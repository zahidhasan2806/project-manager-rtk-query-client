import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProjectsQuery } from '../features/projects/projectsApi';
import { useGetTeamsQuery } from '../features/teams/teamsApi';

const useFetchProjects = () => {
    const [isSkip, setIsSkip] = useState(true);
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
    return (
        <div>

        </div>
    );
};

export default useFetchProjects;