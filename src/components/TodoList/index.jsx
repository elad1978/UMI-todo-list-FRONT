import React from "react";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Task from "../Task";
import { useSelector, useDispatch } from "react-redux"; // Import the useDispatch hook
import {
  deleteTask,
  loadTasksFromServer,
  deleteTaskFromServer,
} from "../../reducers"; // Import the deleteTask action

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);
  useEffect(() => {
    dispatch(loadTasksFromServer());
  }, [dispatch]);
  return (
    <Box mx={4} my={2}>
      <Typography variant="h4">My list</Typography>
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          header={task.header}
          task={task.task}
          date={task.date}
          time={task.time}
          _id={task._id}
          isCheckedTask={task.isCheckedTask}
          urgency={task.urgency}
          onDelete={() => dispatch(deleteTaskFromServer(task._id))} // Use the new handler
          index={index}
        />
      ))}
    </Box>
  );
};

export default TodoList;
