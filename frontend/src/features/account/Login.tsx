import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form' ;
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#523a25',
      }
    },
  });


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
    });


    // firebase login
    // async function loginFirebase (data: FieldValues) {
    //     try {
    //         console.log("before login: ", data.username, data.password);
    //         const user = await signInWithEmailAndPassword(auth, data.username+"@test.com", data.password);
    //         console.log("after login: ", data.username, data.password);
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // };


    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate(location.state?.from || '/');
            // firebase login
            // loginFirebase(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" 
                sx={{display: 'flex', flexDirection:'column', alignItems: 'center', p: 4}}>       
            <Avatar sx={{ m: 1, bgcolor: '#ffa07a' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is requiered'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {... register('password', {required: 'Password is required'})}  
                    error={!!errors.password}
                    helperText={errors?.password?.message as string} 
                />
                <ThemeProvider theme={theme}>
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color={'primary'}
                    >
                    Sign In
                    </LoadingButton>
                </ThemeProvider>
                
                <Grid container flexDirection="column">
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                        {"Don't have an account? Register here"}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to='/apply' style={{ textDecoration: 'none' }}>
                        {"Be part of our team!"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
}