import React from 'react';
import { View, StyleSheet } from 'react-native';
import {useTasks} from "../../context/TaskContext";
import {TaskList} from "../../components/TaskList";

export function CompletedTasks() {
    const { state } = useTasks();

    return (
        <View style={styles.container}>
            <TaskList
                tasks={state.tasks.filter(task => task.status === 'Completada')}
                onEdit={() => {}}
                showEditButton={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});