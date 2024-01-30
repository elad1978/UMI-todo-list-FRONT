import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Box, Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Navbar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TodoList />
          </Grid>
          <Grid item md={4}>
            <TodoForm />
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}

export default App;
