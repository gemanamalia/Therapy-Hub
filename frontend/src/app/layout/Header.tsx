import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

const midLinks = [
    {title: 'catalog', path:'/catalog'},
    {title: 'about', path:'/about'},
    {title: 'contact', path:'/contact'},
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
        backgroundColor: '#59484343',
        borderRadius: '100px'
    }
}


interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange} : Props) {
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
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
                        <Badge badgeContent='4' color='secondary'>
                            <ShoppingCart>
                                
                            </ShoppingCart>
                        </Badge>
                    </IconButton>

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
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}