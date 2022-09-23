import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/pages/Login';
import Projects from './Components/pages/Projects';
import Teams from './Components/pages/Teams/Teams';
import useAuthCheck from './hooks/useAuthCheck';

function App() {
  const authChecked = useAuthCheck()
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Teams />} />
        <Route path="teams" element={<Teams />} />
        <Route path="projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
