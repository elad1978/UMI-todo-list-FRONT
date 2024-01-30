import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListOption from "../ListOptions";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#4d4d4d",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              "&.MuiIconButton-root": {
                margin: "1",
                padding: "1",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "2rem",
              },
            }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <ListOption
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            open={Boolean(anchorEl)}
          />
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            My Todo List
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
