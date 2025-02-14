import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';
import { useTasks } from '../context/TaskContext';
import {API_URL} from "../services/api";

type TaskListProps = {
    tasks: Task[];
    onEdit?: (task: Task) => void;
    showEditButton?: boolean;
};

export const TaskList: React.FC<TaskListProps> = ({
                                                      tasks,
                                                      onEdit,
                                                      showEditButton = true,
                                                  }) => {
    const { dispatch } = useTasks();

    // Cambiar estado de la tarea
    const handleToggleTask = async (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const updatedTask = { ...task, status: task.status === 'Pendiente' ? 'Completada' : 'Pendiente' };

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTask),
                });

                if (response.ok) {
                    dispatch({ type: 'TOGGLE_TASK', payload: id });
                } else {
                    console.error('Error updating task:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    // Eliminar tarea
    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                dispatch({ type: 'DELETE_TASK', payload: id });
            } else {
                console.error('Error deleting task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TaskItem
                    task={item}
                    onToggle={() => handleToggleTask(item.id)}
                    onDelete={() => handleDeleteTask(item.id)}
                    onEdit={() => onEdit?.(item)}
                    showEditButton={showEditButton}
                />
            )}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
    },
});