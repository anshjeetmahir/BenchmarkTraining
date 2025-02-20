
import React, { useReducer, useMemo, useCallback, createContext, useContext } from "react";

interface ITask {
    id: number;
    text: string;
    completed: boolean;
}

interface ITaskContextType {
    state: ITask[];
    addTask: (text: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    completedTaskCount: number;
}

const TaskContext = createContext<ITaskContextType | undefined>(undefined);

const taskReducer = (state: ITask[], action: { type: string; payload: any }): ITask[] => {
    switch (action.type) {
        case "ADD_TASK":
            const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
            return [...state, { id: newId, text: action.payload, completed: false }];
        case "REMOVE_TASK":
            return state.filter(task => task.id !== action.payload);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
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
            dispatch({ type: "ADD_TASK", payload: text });
        }
    }, []);

    const removeTask = useCallback((id: number) => dispatch({ type: "REMOVE_TASK", payload: id }), []);
    const toggleTask = useCallback((id: number) => dispatch({ type: "TOGGLE_TASK", payload: id }), []);

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