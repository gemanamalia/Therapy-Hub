import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {  addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007D14',
    },
    info: {
        main: '#523a25',
    }
  },
});


interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}


export default function BasketTable({items, isBasket = true} : Props) {
    const {  status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    
    return (
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Produs</TableCell>
                        <TableCell align="center">Preț</TableCell>
                        <TableCell align="center">Cantitate</TableCell>
                        <TableCell align="center">Subtotal</TableCell>
                        {isBasket && 
                            <TableCell align="right"></TableCell>} 
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                                    <span>
                                        {item.name}
                                    </span>
                                </Box>
                            </TableCell>
                            <TableCell align="center">{(item.price / 100).toFixed(2)} lei</TableCell>
                            <TableCell align="center">
                            {isBasket && 
                                <LoadingButton 
                                    loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productId: item.productId, quantity: 1, name: 'rem'
                                    }))} 
                                    color='error'
                                >
                                    <Remove />
                                </LoadingButton>}
                                {item.quantity}
                                {isBasket && 
                                <ThemeProvider theme={theme}>
                                    <LoadingButton 
                                        loading={status === 'pendingAddItem' + item.productId} 
                                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                        color='primary'
                                    >
                                        <Add />
                                    </LoadingButton>
                                </ThemeProvider>}
                            </TableCell>
                            <TableCell align="center">{((item.price / 100) * item.quantity).toFixed(2)} lei</TableCell>
                            {isBasket && 
                            <TableCell align="right">
                                <ThemeProvider theme={theme}>
                                    <LoadingButton 
                                        loading={status === 'pendingRemoveItem' + item.productId + 'del'} 
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: item.quantity, name:'del'
                                        }))} 
                                        color='info'
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </ThemeProvider> 

                            </TableCell>}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}