import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#523a25',
    }
  },
});


export default function Search() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <ThemeProvider theme={theme}>
            <TextField
                color="primary"
                label='Search products'
                variant='outlined'
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
                // style={{ boxShadow: ' rgba(0,0,0,0.5)' }}
            />
        </ThemeProvider>
    )
}