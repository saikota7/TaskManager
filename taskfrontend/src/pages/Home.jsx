import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../api';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <button
                onClick={() => navigate('/add-task')}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Task
            </button>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="p-4 bg-gray-100 rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">
                                {task.completed ? 'Completed' : 'Not Completed'}
                            </p>
                        </div>
                        <button
                            className="text-red-500"
                            onClick={() => handleDelete(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
