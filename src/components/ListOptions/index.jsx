import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  sortByUrgency,
  sortByDate,
  sortByCheckboxStatus,
} from "../../reducers";

const ListOption = ({ anchorEl, handleMenuClose, open }) => {
  const dispatch = useDispatch();

  const handleSortByUrgencyLevel = () => {
    dispatch(sortByUrgency());
    handleMenuClose();
  };

  const handleSortByDate = () => {
    dispatch(sortByDate());
    handleMenuClose();
  };

  const handleSortByCheckbox = () => {
    dispatch(sortByCheckboxStatus());
    handleMenuClose();
  };

  return (
    <div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <Typography
          paddingLeft={1.5}
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          Sort by:
        </Typography>
        <MenuItem
          onClick={handleSortByUrgencyLevel}
          sx={{ "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Urgency level
        </MenuItem>
        <MenuItem
          onClick={handleSortByDate}
          sx={{ "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Date
        </MenuItem>
        <MenuItem
          onClick={handleSortByCheckbox}
          sx={{ "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Done task
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ListOption;
