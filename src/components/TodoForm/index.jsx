import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../reducers";
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
import { addTaskToServer } from "../../reducers";

const schema = yup.object().shape({
  header: yup.string().required("Header is required"),
  task: yup.string(),
  urgency: yup.number().required("Urgency is required"),
  date: yup.date().nullable(),
  time: yup.string(),
});

const urgencyColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

const TodoForm = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newTask = {
      ...data,
      id: new Date().getTime(),
      isCheckedTask: false,
    };
    newTask.date = new Date(newTask.date).toISOString();
    dispatch(addTaskToServer(data));
    console.log(newTask);
    reset();
  };

  return (
    <Box mx={4} my={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">New task</Typography>

        <Controller
          name="header"
          control={control}
          defaultValue=""
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
            />
          )}
        />

        <Controller
          name="task"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              multiline
              maxRows={4}
              {...field}
              id="outlined-task-input"
              label="Enter your task details"
              type="text"
              error={!!errors.task}
              helperText={errors.task?.message}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={null}
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
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        <FormControl sx={{ paddingLeft: "10%" }}>
          <FormLabel id="demo-radio-buttons-group-label">Urgency</FormLabel>
          <Controller
            name="urgency"
            control={control}
            defaultValue="Low Urgency"
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
          Add Task
        </Button>
      </form>
    </Box>
  );
};

export default TodoForm;
