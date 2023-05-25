import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useGlobalState, GlobalState } from "../GlobalStateContextHooks";
import Todo from '../components/Todo';
import { useState } from 'react';

function Feed() {
    const { todos } = useGlobalState();
    const [newTodo, setNewTodo] = useState({
        text: "",
        done: false
    })
    const [successOpen, setSuccessOpen] = useState(false);
    const [failOpen, setFailOpen] = useState(false);
    const countOfTasksToComplete = todos.filter((todo) => todo.done === false).length

    const setNewTodoText = e => {
        setNewTodo(existingValues => ({
            ...existingValues,
            text: e.target.value,
        }))
    }

    function addToDo(newtodo) {
        handleOpen();
        if (newtodo.text === "") {
            return;
        }
        else {
            GlobalState.set({
                todos: [...todos, newtodo]
            });
        }
    }

    const handleOpen = () => {
        if (newTodo.text !== "")
            setSuccessOpen(true);
        else
            setFailOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setFailOpen(false);
    };

    return (
        <div>
            <Box sx={{ mb: "24px" }}>
                <TextField id="outlined-basic" label="New task" variant="outlined" onChange={setNewTodoText} />
                <Button variant="text" sx={{ p: "16px 0px", ml: "10px", minWidth: "0px" }} onClick={() => addToDo(newTodo)} ><AddIcon /></Button>
            </Box>
            <Typography>
                You have {countOfTasksToComplete} tasks to complete.
            </Typography>
            <Box sx={{ m: "16px 0px" }}>
                {todos.map((todo) => (
                    <Todo key={todos.indexOf(todo)} todo={todo} />
                ))}
            </Box>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Task added succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={failOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    New task cannot be empty!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Feed;