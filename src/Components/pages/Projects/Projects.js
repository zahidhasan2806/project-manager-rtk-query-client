import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import Layout from '../../ui/Layout';
import BoardColumn from './BoardColumn';

const Projects = () => {
    return (
        <div>
            <Layout>
                <div className='px-10 mt-6'>
                    <h1 className='text-2xl font-bold'>Project Board</h1>
                </div>
                <div>
                    <DndProvider backend={HTML5Backend}>
                        <BoardColumn />
                    </DndProvider>
                </div>
            </Layout>

        </div>
    );
};

export default Projects;