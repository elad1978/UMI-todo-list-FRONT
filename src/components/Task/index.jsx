// Task.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../reducers";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  ListItem,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateTaskForm from "../UpdateTaskForm";
import { updateTaskOnServer } from "../../reducers";

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}

const Task = ({
  header,
  task,
  urgency,
  onDelete,
  index,
  date,
  time,
  _id,
  isCheckedTask,
}) => {
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleOpenUpdateForm = () => {
    setIsOpenUpdateForm(!isOpenUpdateForm);
  };

  const handleCheckboxChange = () => {
    const updatedTask = {
      header,
      task,
      urgency,
      date,
      time,
      _id,
      isCheckedTask: !isCheckedTask,
    };
    // Dispatch the updateTaskOnServer action
    dispatch(updateTaskOnServer(updatedTask));
  };

  const label = { inputProps: { "aria-label": "done task" } };

  return (
    <Paper elevation={3} sx={{ marginBottom: 2 }}>
      {isOpenUpdateForm ? (
        <UpdateTaskForm
          handleOpenUpdateForm={handleOpenUpdateForm}
          header={header}
          task={task}
          date={date}
          time={time}
          _id={_id}
          urgency={urgency}
          index={index}
          isCheckedTask={isCheckedTask}
        />
      ) : (
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              {...label}
              onChange={handleCheckboxChange}
              checked={isCheckedTask}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: isCheckedTask ? "line-through" : "none",
                }}
              >
                {header}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: isCheckedTask ? "line-through" : "none",
                }}
              >
                Details : {task}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderLeft: "2px solid grey",
              paddingLeft: 2,
              width: 230,
            }}
          >
            <Box width={130}>
              {date ? (
                <Typography variant="body2">
                  {formatDateToDDMMYYYY(date)}
                </Typography>
              ) : null}

              {time !== "" ? (
                <Typography variant="body2">Time for task: {time}</Typography>
              ) : null}

              <Paper
                elevation={2}
                sx={{
                  backgroundColor:
                    urgency === 2 ? "red" : urgency === 1 ? "orange" : "green",
                  padding: "4px",
                }}
              >
                <Typography variant="body2">
                  Urgency:{" "}
                  {urgency === 2 ? "High" : urgency === 1 ? "Medium" : "Low"}
                </Typography>
              </Paper>
            </Box>
            <Box marginLeft={1}>
              <IconButton color="primary" onClick={handleOpenUpdateForm}>
                <UpdateIcon />
              </IconButton>
              {isCheckedTask ? (
                <IconButton onClick={() => onDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </Box>
          </Box>
        </ListItem>
      )}
    </Paper>
  );
};

export default Task;
