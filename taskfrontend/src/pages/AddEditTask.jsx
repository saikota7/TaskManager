import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

const AddEditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask({ title, description, completed });
        navigate('/'); // Redirect to Home after adding the task
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                    Add a New Task
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-gray-700 mb-2 font-semibold"
                        >
                            Task Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Task Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-gray-700 mb-2 font-semibold"
                        >
                            Task Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Task Completed */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="completed"
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="completed" className="text-gray-700 font-medium">
                            Mark as Completed
                        </label>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTask;
