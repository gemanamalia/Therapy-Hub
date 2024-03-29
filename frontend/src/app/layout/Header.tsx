import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminMenu from "./AdminMenu";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa07a',
    }
  },
});


const midLinks = [
    {title: 'shop', path:'/catalog'},
    {title: 'psihologi', path:'/therapists'},
    {title: 'resurse', path:'/contact'},
]

const rightLinks = [
    {title: 'login', path:'/login'},
    {title: 'register', path:'/register'},
]

const navStyles ={
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: '#523a25',
    },
    '&.active': {
        // color: 'text.secondary',
        // backgroundColor: '#59484343',
        // borderRadius: '100px',
        color: '#523a25',
        fontWeight: 'bold',
    }
}


interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange} : Props) {
    const {basket} = useAppSelector(state => state.basket);
    const {user} = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' sx={{mb: 4}} style={{ background: '#c5a297' }}>
            <Toolbar  sx={{dosplay: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                        to='/'
                        sx={ navStyles }
                    >
                        Therapy Hub
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>
                
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={ navStyles }
                        >
                            {title.toLocaleUpperCase()}
                        </ListItem>
                    ))}
                    {user && user.roles?.includes('Admin' ) &&
                        <AdminMenu />
                    // <>
                    //     <ListItem
                    //         component={NavLink}
                    //         to={'/inventory'}
                    //         sx={ navStyles }
                    //     >
                    //         INVENTAR
                    //     </ListItem>
                    //     <ListItem
                    //         component={NavLink}
                    //         to={'/accounts'}
                    //         sx={ navStyles }
                    //     >
                    //         CONTURI
                    //     </ListItem>
                    //     <ListItem
                    //         component={NavLink}
                    //         to={'/feedbackinventory'}
                    //         sx={ navStyles }
                    //     >
                    //         RECENZII
                    //     </ListItem>
                    // </>
                    }
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}}>
                    <ThemeProvider theme = {theme}>
                        <Badge badgeContent={itemCount} color='primary'>
                            <ShoppingCart></ShoppingCart>
                        </Badge>
                    </ThemeProvider>
                    </IconButton>

                    { user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{display: 'flex'}}>
                            {rightLinks.map(({title, path}) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={ navStyles }
                                >
                                    {title.toLocaleUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}