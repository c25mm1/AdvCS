import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';
function TaskForm({ onSave }) {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [taskClass, setTaskClass] = useState('');
    const [taskType, setTaskType] = useState('home');
    const [status, setStatus] = useState('to-do');
    const [details, setDetails] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [completed, setCompleted] = useState(false);
    const handleSave = () => {
        const task = {
            id: new Date().getTime(),
            taskName,
            dueDate,
            priority,
            taskClass,
            taskType,
            status,
            details,
            subtasks,
            completed,
        };
        onSave(task);
        resetForm();
    };
    const resetForm = () => {
        setTaskName('');
        setDueDate('');
        setPriority('low');
        setTaskClass('');
        setTaskType('home');
        setStatus('to-do');
        setDetails('');
        setSubtasks([]);
        setCompleted(false);
    };
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <label>Task Name: <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} /></label>
            <label>Due Date: <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></label>
            <label>Priority:
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <label>Class: <input type="text" value={taskClass} onChange={(e) => setTaskClass(e.target.value)} /></label>
            <label>Type:
                <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                    <option value="home">Home</option>
                    <option value="school">School</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <label>Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="to-do">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="almost-done">Almost Done</option>
                    <option value="done">Done</option>
                    <option value="off-track">Off Track</option>
                </select>
            </label>
            <label>Details: <textarea value={details} onChange={(e) => setDetails(e.target.value)}></textarea></label>
            <label>Completed: <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} /></label>
            <button type="submit">Save Task</button>
        </form>
    );
}
function TaskList({ tasks, onDelete }) {
    return (
        <div>
            <h2>Saved Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>Due: {task.dueDate} | Priority: {task.priority} | Type: {task.taskType}</p>
                        <p>Status: {task.status} | Class: {task.taskClass}</p>
                        <p>{task.details}</p>
                        <p>Completed: {task.completed ? "Yes" : "No"}</p>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
function TaskManager() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const savedTasks = Cookies.get('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);
    useEffect(() => {
        Cookies.set('tasks', JSON.stringify(tasks), { expires: 7 });
    }, [tasks]);
    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    };
    return (
        <div>
            <h1>PlanMyWeek</h1>
            <TaskForm onSave={addTask} />
            <TaskList tasks={tasks} onDelete={deleteTask} />
        </div>
    );
}


const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<TaskManager />);
