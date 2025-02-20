import { useState } from "react";
import { useTasks } from "./TaskProvider";
import './TaskManagement.css'

export const TaskManagement: React.FC = () => {
    const { state, addTask, removeTask, toggleTask, completedTaskCount } = useTasks();
    const [taskText, setTaskText] = useState("");

    return (
        <>
            <div className="header">
                <h2>Task Manager</h2>
                <input
                    type="text"
                    value={taskText}
                    onChange={e => setTaskText(e.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={() => {
                    if (taskText !== "") {
                        addTask(taskText);
                        setTaskText("");
                    }
                }}>Add Task</button>

            </div>
            <ul>
                {state.map(task => (
                    <li key={task.id}>
                        <p>
                            ID: {task.id}<br />Task: {task.text}
                        </p>
                        <button
                            onClick={() => toggleTask(task.id)}
                            style={{ backgroundColor: task.completed ? "green" : "red", color: "white", marginLeft: "10px" }}
                        >
                            {task.completed ? "Complete" : "Incomplete"}
                        </button>
                        <button onClick={() => removeTask(task.id)} style={{ backgroundColor: 'deepskyblue' }}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3 style={{ textAlign: 'center', backgroundColor: 'Cornsilk', color: 'black' }}>Completed Tasks: {completedTaskCount}</h3>
        </>
    );
};
