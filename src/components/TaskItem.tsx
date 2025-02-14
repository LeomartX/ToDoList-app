import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type TaskItemProps = {
    task: {
        id: number;
        title: string;
        description: string;
        status: string;
    };
    onToggle: () => void;
    onDelete: () => void;
    onEdit?: () => void;
    showEditButton?: boolean;
};

export const TaskItem: React.FC<TaskItemProps> = ({
                                                      task,
                                                      onToggle,
                                                      onDelete,
                                                      onEdit,
                                                      showEditButton = true,
                                                  }) => {
    // Confirmación para cambiar estado de la tarea
    const handleToggleWithConfirmation = () => {
        Alert.alert(
            'Confirmar',
            `¿Estás seguro de que quieres marcar esta tarea como ${task.status === 'Pendiente' ? 'completada' : 'pendiente'}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: onToggle,
                },
            ],
            { cancelable: false }
        );
    };

    // Confirmación para eliminar tarea
    const handleDeleteWithConfirmation = () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: onDelete,
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={handleToggleWithConfirmation}>
                <Text style={task.status === 'Completada' ? styles.completedTask : styles.taskText}>
                    {task.title}
                </Text>
                <Text style={styles.description}>{task.description}</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                {showEditButton && onEdit && (
                    <TouchableOpacity onPress={onEdit}>
                        <Text style={styles.editButton}>Editar</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleDeleteWithConfirmation}>
                    <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskText: {
        fontSize: 16,
    },
    completedTask: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    editButton: {
        color: 'blue',
        marginRight: 10,
    },
    deleteButton: {
        color: 'red',
    },
});