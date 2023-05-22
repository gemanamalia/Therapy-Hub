import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";

export default function SignedInMenu() {
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
        <>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6' }}
            >
                {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose} component={Link} to='/profile'>Profilul meu</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/orders'>Comenzile mele</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/personalBookings'>Programările mele</MenuItem>

                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>
                    Logout
                </MenuItem>
             </Menu>
        </>
  );
}