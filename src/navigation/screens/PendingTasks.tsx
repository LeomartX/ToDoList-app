import React, { useState } from 'react';
import { View, Button, StyleSheet, Modal } from 'react-native';
import { useTasks } from "../../context/TaskContext";
import { TaskForm } from "../../components/TaskForm";
import { TaskList } from "../../components/TaskList";

type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
};

export function PendingTasks() {
    const { state } = useTasks();
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddTask = (title: string, description: string) => {
        setIsAddingTask(false);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };

    const handleUpdateTask = (title: string, description: string) => {
        setEditingTask(null);
    };

    return (
        <View style={styles.container}>
            {isAddingTask ? (
                <TaskForm
                    onSubmit={handleAddTask}
                    onCancel={() => setIsAddingTask(false)}
                />
            ) : (
                <Button title="Agregar Tarea" onPress={() => setIsAddingTask(true)} />
            )}
            <TaskList
                tasks={state.tasks.filter(task => task.status === 'Pendiente')}
                onEdit={handleEditTask}
            />
            <Modal visible={!!editingTask} animationType="slide">
                <View style={styles.modalContainer}>
                    <TaskForm
                        taskId={editingTask?.id}
                        initialTitle={editingTask?.title}
                        initialDescription={editingTask?.description}
                        onSubmit={handleUpdateTask}
                        onCancel={() => setEditingTask(null)}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});