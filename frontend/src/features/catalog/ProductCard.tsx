import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardHeader, Avatar } from "@mui/material";
import {Link} from  "react-router-dom";
import { Product } from "../../app/models/product";
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product} : Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    

    return (
        <Card style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.5)' }}>
            <CardHeader
                avatar= {
                    <Avatar sx={{bgcolor: '#ffa07a' }}>
                        {product.name.charAt(0).toLocaleUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps = {{
                    sx: {fontWeight: 'bold'}
                }}
            />
            <CardMedia
                sx={{ height: 230, backgroundSize : 'contain', bgcolor: '#ffffff' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='#523a25' variant="h6">
                    {currencyFormat(product.price)} lei
                </Typography>
                <Typography variant="body2" color="text.secondary">
                     {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={status.includes('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
                    size="small"
                    style={{ color: '#007D14', fontWeight: 'bold', fontSize: '15px' }}
                    >
                       Adaugă în coș
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small" 
                    style={{ color: '#523a25', marginLeft: '25px' }}
                >
                    Vezi detalii
                </Button>
            </CardActions>
        </Card>
    )
}