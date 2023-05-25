import * as React from 'react';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';
import { Box, Button, Checkbox } from '@mui/material';
import { useGlobalState, GlobalState } from "../GlobalStateContextHooks";
import { useState } from 'react';


function Todo(props) {
    const { todos } = useGlobalState();
    const index = todos.indexOf(props.todo);
    const [updating, setUpdating] = useState(false)
    const [updatingTodo, setUpdatingTodo] = useState({
        text: props.todo.text,
        done: props.todo.done
    })

    function handleDoneChange() {
        const newTodo = {
            text: props.todo.text,
            done: !props.todo.done
        }
        updateTodo(newTodo);
    }

    const handleUpdatingChange = (bool) => {
        setUpdating(bool);
    };

    const setUpdatingTodoText = e => {
        setUpdatingTodo(existingValues => ({
            ...existingValues,
            text: e.target.value,
        }))
    }

    function removeTodo() {
        GlobalState.set({
            todos: todos.filter((_, i) => i !== index)
        });
    }

    function updateTodo(newTodo) {
        if (newTodo.text === "")
            return;

        const nextTodos = todos.map((todo, i) => {
            if (i === index) {
                return newTodo;
            } else {
                return todo;
            }
        })

        GlobalState.set({
            todos: nextTodos
        });

        handleUpdatingChange(false);
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: 1, width: "100%", p: "8px 16px", mb: "10px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }} >
                {updating ?
                    <TextField label="Task" variant="standard" defaultValue={props.todo.text} onChange={setUpdatingTodoText} />
                    :
                    <>
                        <Checkbox onChange={handleDoneChange} />
                        <Typography sx={{ p: "9px 0" }}>{props.todo.done ? <s> {props.todo.text}</s> : props.todo.text}</Typography>
                    </>
                }
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", opacity: "0.5" }} >
                {updating ?
                    <>
                        <Button variant="text" sx={{ p: "15px 15px", ml: "5px", minWidth: "0px", color: "black" }} onClick={() => handleUpdatingChange(false)}><CancelIcon /></Button>
                        <Button variant="text" sx={{ p: "15px 15px", ml: "5px", minWidth: "0px", color: "black" }} onClick={() => updateTodo(updatingTodo)}><CheckCircleOutlineIcon /></Button>
                    </>
                    :
                    <>
                        <Button variant="text" sx={{ p: "15px 15px", ml: "5px", minWidth: "0px", color: "black" }} onClick={() => handleUpdatingChange(true)}><BorderColorIcon /></Button>
                        <Button variant="text" sx={{ p: "15px 15px", ml: "5px", minWidth: "0px", color: "black" }} onClick={() => removeTodo()}><DeleteOutlineIcon /></Button>
                    </>
                }
            </Box>
        </Box>
    )
}

export default Todo;