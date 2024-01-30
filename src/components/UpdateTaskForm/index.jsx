import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { updateTask, updateTaskOnServer } from "../../reducers";

const schema = yup.object().shape({
  header: yup.string().required("Header is required"),
  task: yup.string(),
  urgency: yup.string().required("Urgency is required"),
  date: yup.date().nullable(),
  time: yup.string(),
});

const urgencyColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const UpdateTaskForm = ({
  header,
  task,
  date,
  time,
  urgency,
  handleOpenUpdateForm,
  _id,
  isCheckedTask,
}) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newTask = {
      ...data,
      isCheckedTask,
      _id,
    };
    newTask.date = new Date(newTask.date).toISOString();
    console.log(newTask);
    dispatch(updateTaskOnServer(newTask));
    handleOpenUpdateForm();
  };

  return (
    <Box mx={4} my={2} pt={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "2%",
          }}
        >
          <Typography variant="h4">Update {header}</Typography>
          <IconButton onClick={handleOpenUpdateForm} color="inherit">
            <ClearIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        <Controller
          name="header"
          control={control}
          defaultValue={header}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-header-input"
              label="Enter task name(required)"
              type="text"
              error={!!errors.header}
              helperText={errors.header?.message}
              required
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
              size="small"
            />
          )}
        />

        <Controller
          name="task"
          control={control}
          defaultValue={task}
          render={({ field }) => (
            <TextField
              multiline
              maxRows={2}
              {...field}
              id="outlined-task-input"
              label="Enter your task details"
              type="text"
              error={!!errors.task}
              helperText={errors.task?.message}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
              size="small"
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={formatDateToYYYYMMDD(date)}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-date-input"
              label="Select a date"
              type="date"
              value={field.value || ""}
              error={!!errors.date}
              helperText={errors.date?.message}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                field.onChange(e.target.value !== "" ? e.target.value : null);
              }}
              size="small"
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          defaultValue={time}
          render={({ field }) => (
            <TextField
              {...field}
              id="time"
              label="Select a time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 minutes interval
              }}
              size="small"
            />
          )}
        />

        <FormControl sx={{ paddingLeft: "10%" }}>
          <FormLabel id="demo-radio-buttons-group-label">Urgency</FormLabel>
          <Controller
            name="urgency"
            control={control}
            defaultValue={urgency}
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-labelledby="demo-radio-buttons-group-label"
                row
              >
                {["Low", "Medium", "High"].map((level, index) => (
                  <FormControlLabel
                    key={level}
                    value={index}
                    control={
                      <Radio
                        sx={{
                          color: urgencyColors[level],
                          "&.Mui-checked": { color: urgencyColors[level] },
                        }}
                      />
                    }
                    label={level}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Update Task
        </Button>
      </form>
    </Box>
  );
};

export default UpdateTaskForm;
