import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';
import { search } from '../../features/projects/projectsSlice';
import logo from '../../images/logo.png'
import { debounce } from '../../utils/utils';

const Navigation = () => {
    const dispatch = useDispatch();
    const projects = useMatch('/projects');
    const teams = useMatch('/teams');
    const { user } = useSelector((state) => state.auth) || {};
    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    const handleSearch = (e) => {
        dispatch(search(e.target.value));
    };
    return (
        <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-10 w-10" />

                {projects && (
                    <input
                        onChange={debounce(handleSearch, 400)}
                        className={`flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring`}
                        type="search"
                        placeholder="Search for anything…"
                    />
                )}
                <div className="ml-10">
                    <Link
                        className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${projects ? 'text-indigo-700' : 'text-gray-600'
                            }`}
                        to="/projects"
                    >
                        Projects
                    </Link>
                    <Link
                        className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${teams ? 'text-indigo-700' : 'text-gray-600'
                            }`}
                        to="/teams"
                    >
                        Teams
                    </Link>

                </div>

            </div>

            <div className="flex items-center gap-8">
                <button
                    className="bg-violet-600 hover:bg-violet-700 transition delay-100 font-semibold text-sm text-violet-100 px-7 py-1 rounded-lg " onClick={handleLogout}
                >
                    Logout
                </button>
                <div
                    className='relative flex flex-col items-start cursor-pointer bg-opacity-90 group hover:bg-opacity-100'
                    draggable='true'>
                    <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">

                        <img src={user?.avatar ? user.avatar : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'} alt="User Avatar" />
                    </button>
                    <div className='w-60 absolute bg-white  p-4 top-8 right-0 flex items-center justify-center hidden h-5 mt-3  rounded text-black group-hover:flex'>
                        <h1 className="font-bold">{user?.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
