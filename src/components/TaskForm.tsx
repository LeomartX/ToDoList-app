import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { API_URL } from "../services/api";
import { useTasks } from '../context/TaskContext';

type TaskFormProps = {
    taskId?: number;
    initialTitle?: string;
    initialDescription?: string;
    onSubmit: (title: string, description: string) => void;
    onCancel?: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({
                                                      taskId,
                                                      initialTitle = '',
                                                      initialDescription = '',
                                                      onSubmit,
                                                      onCancel,
                                                  }) => {
    // Estado local para el formulario
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [errors, setErrors] = useState({ title: '', description: '' });
    const { dispatch } = useTasks();

    const validateForm = () => {
        const newErrors = {
            title: '',
            description: ''
        };
        let isValid = true;

        if (!title.trim()) {
            newErrors.title = 'El título es obligatorio';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Manejo del envío del formulario
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const taskData = {
            title,
            description,
            status: 'Pendiente',
        };

        try {
            // Actualizar tarea existente
            if (taskId) {
                const response = await fetch(`${API_URL}/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...taskData, id: taskId }),
                });

                if (response.ok) {
                    const updatedTask = {
                        id: taskId,
                        ...taskData
                    };
                    dispatch({ type: 'EDIT_TASK', payload: updatedTask });
                    onSubmit(title, description);
                } else {
                    console.error('Error updating task:', response.statusText);
                }
            } else {
                // Crear nueva tarea
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                if (response.ok) {
                    const createdTask = await response.json();
                    dispatch({ type: 'ADD_TASK', payload: createdTask });
                    onSubmit(title, description);
                } else {
                    console.error('Error creating task:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, errors.title ? styles.inputError : null]}
                placeholder="Título"
                value={title}
                onChangeText={(text) => {
                    setTitle(text);
                    if (errors.title) {
                        setErrors(prev => ({ ...prev, title: '' }));
                    }
                }}
            />
            {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

            <TextInput
                style={[styles.input, errors.description ? styles.inputError : null]}
                placeholder="Descripción"
                value={description}
                onChangeText={(text) => {
                    setDescription(text);
                    if (errors.description) {
                        setErrors(prev => ({ ...prev, description: '' }));
                    }
                }}
                multiline
            />
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

            <View style={styles.buttonContainer}>
                <Button title="Guardar" onPress={handleSubmit} />
                {onCancel && (
                    <Button title="Cancelar" onPress={onCancel} color="gray" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});