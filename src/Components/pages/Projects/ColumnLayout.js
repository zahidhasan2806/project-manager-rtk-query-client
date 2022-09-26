import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useUpdateProjectMutation } from '../../../features/projects/projectsApi';
import Project from './Project';

const ColumnLayout = ({ projects: allProject, stage, control, teams }) => {
    const [projects, setProjects] = useState([]);
    const { searchString } = useSelector((state) => state.projects);
    const [updateProject] = useUpdateProjectMutation();

    //dnd
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item, monitor) => updateProject({ id: item.id, stage: stage.toLowerCase() }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    //filter by stage
    const filterProjectByStage = (stage) => {
        return (project) => project.stage === stage;
    };

    //search
    const searchFilter = (string) => {
        return (project) => {
            if (!string?.trim().length) {
                return project;
            } else {
                return project.title.toLowerCase().match(string) ? { ...project, match: true } : { ...project, match: false };
            }
        };
    };

    useEffect(() => {
        const filteredProjects =
            allProject?.map(searchFilter(searchString)).filter(filterProjectByStage(stage.toLowerCase())) || [];
        setProjects(filteredProjects);
    }, [allProject, searchString, stage]);

    return (
        <>
            <div className='flex flex-col flex-shrink-0 w-64'>
                <div className='flex items-center flex-shrink-0 h-10 px-2'>
                    <span className='block text-sm font-semibold'>{stage}</span>
                    <span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
                        {projects?.length}
                    </span>

                    {stage.toLowerCase() === 'backlog' && (
                        <button onClick={() => control(true)}
                            className='flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'>
                            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <div
                    className={`flex flex-col pb-2 overflow-auto scrollbar min-h ${isOver && 'bg-indigo-300'}`}
                    ref={drop}
                    style={{ minHeight: '80vh' }}>
                    {projects?.map((project) => (
                        <Project key={project.id} project={project} teams={teams} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ColumnLayout;