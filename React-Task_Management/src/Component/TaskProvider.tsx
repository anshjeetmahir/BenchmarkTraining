
import React, { useReducer, useMemo, useCallback, createContext, useContext } from "react";

interface ITask {
    id: number;
    text: string;
    completed: boolean;
}

type TaskAction =
    | { type: "ADD_TASK"; value: string }
    | { type: "REMOVE_TASK"; value: number }
    | { type: "TOGGLE_TASK"; value: number };

interface ITaskContextType {
    state: ITask[];
    addTask: (text: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    completedTaskCount: number;
}

const TaskContext = createContext<ITaskContextType | undefined>(undefined);

const taskReducer = (state: ITask[], action: TaskAction): ITask[] => {
    switch (action.type) {
        case "ADD_TASK":
            const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
            return [...state, { id: newId, text: action.value, completed: false }];
        case "REMOVE_TASK":
            return state.filter(task => task.id !== action.value);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.value ? { ...task, completed: !task.completed } : task
            );
        default:
            return state;
    }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, []);

    const completedTaskCount = useMemo(() => state.filter(task => task.completed).length, [state]);

    const addTask = useCallback((text: string) => {
        if (text !== "") {
            dispatch({ type: "ADD_TASK", value: text });
        }
    }, []);

    const removeTask = useCallback((id: number) => dispatch({ type: "REMOVE_TASK", value: id }), []);

    const toggleTask = useCallback((id: number) => dispatch({ type: "TOGGLE_TASK", value: id }), []);

    return (
        <TaskContext.Provider value={{ state, addTask, removeTask, toggleTask, completedTaskCount }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): ITaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("Unable to get context...");
    }
    return context;
};
