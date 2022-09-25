import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/pages/Login';
import Projects from './Components/pages/Projects';
import Teams from './Components/pages/Teams/Teams';
import PrivateRoute from './Components/router/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';

function App() {
  const authChecked = useAuthCheck()
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
        <Route path="projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
