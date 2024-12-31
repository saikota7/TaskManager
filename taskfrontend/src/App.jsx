import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEditTask from './pages/AddEditTask';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-task" element={<AddEditTask />} />
            </Routes>
        </Router>
    );
};

export default App;
