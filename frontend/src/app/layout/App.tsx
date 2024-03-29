import { CssBaseline, Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);


  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]) 


  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#ffffff" : '#272829'
      } ,
      text: {
        primary: paletteType === 'light' ? "#523a25" : "#ffffff"
      }
      
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);

  }

  if(loading) return <LoadingComponent message="Initialising app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container color="textPrimary">
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
