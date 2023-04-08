import {  Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BaskePage() {
    const {basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
 
    
    // const [loading, setLoading] = useState(true); 
    // const [basket, setBasket] = useState<Basket | null>(null);

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))    
    // }, [])

    // if (loading) return <LoadingComponent message="Loading basket..." />

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>

            </Grid>
        </>
        
    )
}