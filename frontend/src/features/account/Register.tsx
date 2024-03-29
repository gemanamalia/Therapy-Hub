import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#523a25',
      }
    },
  });


export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string, index: number) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

    // firebase register
    // async function registerFirebase(data: FieldValues) {
    //     try {
    //         console.log("before register: ", data.email, data.password);
    //         const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    //         console.log("after register", user);
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // };


    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: '#ffa07a' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful! You can now login');
                        navigate('/login');

                        // firebase register
                        // registerFirebase(data);
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { 
                        required: 'password is required',
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                            message: 'Password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                <ThemeProvider theme={theme}>
                    <LoadingButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        color={'primary'}
                        variant="contained" sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </LoadingButton>
                </ThemeProvider>

                <Grid container  flexDirection="column">
                    <Grid item>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            {"Already have an account? Sign In"}
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