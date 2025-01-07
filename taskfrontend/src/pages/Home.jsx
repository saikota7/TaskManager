import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask, toggleTaskCompletion, updateTask } from "../api";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track task being edited
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Delete a task and refresh the list
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle task completion and update the state
  const handleToggleCompletion = async (taskId) => {
    try {
      const updatedTask = await toggleTaskCompletion(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Start editing a task
  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({ title: task.title, description: task.description });
  };

  // Save edited task
  const handleSaveEdit = async () => {
    try {
      const updatedTask = await updateTask(editingTask, editForm);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setEditingTask(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <button
        onClick={() => navigate("/add-task")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded shadow flex justify-between items-center ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            {editingTask === task.id ? (
              <div className="flex-grow">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  placeholder="Task Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border rounded"
                  placeholder="Task Description"
                ></textarea>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-semibold bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    onClick={() => setEditingTask(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
                <p
                  className={`text-sm font-medium ${
                    task.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {task.completed ? "Completed" : "Not Completed"}
                </p>
              </div>
            )}
            <div className="flex items-center space-x-4">
              {!editingTask && (
                <>
                  <button
                    className={`px-3 py-1 text-sm font-semibold rounded ${
                      task.completed
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    onClick={() => handleToggleCompletion(task.id)}
                  >
                    {task.completed
                      ? "Mark as Not Completed"
                      : "Mark as Completed"}
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-semibold text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className="px-3 py-1 text-sm font-semibold text-red-500 hover:text-red-700"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
