import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function AdminMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6' }}
            >
                Inventar
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose} component={Link} to='/inventory'>Produse</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/accounts'>Conturi</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/feedbackinventory'>Recenzii</MenuItem>

             </Menu>
        </div>
  );
}