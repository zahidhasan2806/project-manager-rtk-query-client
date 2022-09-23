import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';
import logo from '../../images/logo.png'

const Navigation = () => {
    const dispatch = useDispatch();
    const projects = useMatch('/projects');
    const teams = useMatch('/teams');
    const { user } = useSelector((state) => state.auth) || {};
    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };
    return (
        <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-10 w-10" />

                {projects && (
                    <input
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
                <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                    {user?.name}
                </button>
            </div>
        </div>
    );
};

export default Navigation;