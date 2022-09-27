import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import logo from '../../images/logo.png';
import Error from '../../ui/Error';

const Login = () => {
    const [login, { data, isLoading, error: responseError }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }

    }, [data, responseError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
        if (data?.accessToken && data?.user) {
            navigate('/teams');
        }
    };


    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB]">
            <div className="min-h-full flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt="Learn with sumit"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    {error !== '' && <Error message={error} />}
                </div>
            </div>
            <div className='shadow-2xl p-4'>
                <p>Email: zahid@student.learnwithsumit.com</p>
                <p>Email: sumit@learnwithsumit.com</p>
                <p>Email: akash@learnwithsumit.com</p>
                <p>Email: incognito@learnwithsumit.com</p>
                <p>Email: test@learnwithsumit.com</p>
                <p>Password: 123456</p>
            </div>
        </div>
    );
};

export default Login;