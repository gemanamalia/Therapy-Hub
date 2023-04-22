import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#523a25',
    }
  },
});


export default function ProductDetails() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product && id) dispatch(fetchProductAsync(parseInt(id))) 
     }, [id, item, product, dispatch]);
 
    function handleInputChange(e: any) {
        if (e.target.value >= 0)
            setQuantity(parseInt(e.target.value));
    } 

    function handleUpdateCart() {
        if (!item || quantity > item?.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '300px', height: "450px" }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h5' color='#523a25'>{(product.price / 100).toFixed(2)} Lei</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Titlu</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Descriere</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Categorie</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Autor</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cantitate disponibilă în stoc</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <ThemeProvider theme={theme}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleInputChange}
                                variant={'outlined'}
                                type={'number'}
                                label={'Cantitate în coș'}
                                fullWidth
                                value={quantity}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                disabled={(item?.quantity === quantity )|| (!item && quantity === 0)}
                                loading={status.includes('pending')}
                                onClick={handleUpdateCart}
                                sx={{ height: '55px' }}
                                color={'primary'}
                                size={'large'}
                                variant={'contained'}
                                fullWidth>
                                {item ? 'Actualizează cantitate' : 'Adaugă în coș'}
                            </LoadingButton>
                        </Grid>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}