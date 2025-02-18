
import { useState, useEffect } from "react";
import './todo.css'

interface Todo {
    id: number;
    text: string;
}

const TodoList = () => {

    const initialState = () => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    };

    const initialIdState = () => {
        const savedTodos = initialState();
        return savedTodos.length > 0 ? savedTodos[savedTodos.length - 1].id + 1 : 1;
    }

    const [todos, setTodos] = useState<Todo[]>(initialState);
    const [input, setInput] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [nextId, setNextId] = useState<number>(initialIdState);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        if (todos.length === 0) {
            setNextId(1);
        }
    }, [todos]);



    const addTodo = () => {
        if (!input) return;

        if (editId !== null) {
            setTodos(todos.map(todo => (todo.id === editId ? { ...todo, text: input } : todo)));
            setEditId(null);
        } else {
            setTodos([...todos, { id: nextId, text: input }]);
            setNextId(nextId + 1);
        }
        setInput("");
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setInput(todoToEdit.text);
            setEditId(id);
        }
    };

    const clearAllTodos = () => {
        localStorage.clear();
        setTodos([]);
    };

    return (
        <div >

            <div className="list">

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter New Task.."
                />

                <button onClick={addTodo} className="add-btn">
                    {editId !== null ? "Update" : "Add"}
                </button>
                <button onClick={clearAllTodos} className="delAll-btn">
                    Delete All
                </button>

            </div>

            <ul >

                {todos.map((todo) => (
                    <li key={todo.id} >
                        <p>{todo.text}</p>
                        <div>
                            <button className="edit-btn" onClick={() => editTodo(todo.id)}>Edit</button>
                            <button className="del-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default TodoList;



