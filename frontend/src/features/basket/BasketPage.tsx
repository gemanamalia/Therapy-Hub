import {  Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#523a25',
    }
  },
});

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

    if (!basket) return (
        <>
             <Typography variant='h4'>Coșul tău de cumpărături este gol.</Typography>
             <Typography variant='h4'>Adaugă produse și revino pentru a finaliza comanda.</Typography>
        </>
    )

    return (
        <>
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <ThemeProvider theme={theme}>
                        <Button
                            component={Link}
                            to='/checkout'
                            variant='contained'
                            size='large'
                            color="primary"
                            fullWidth
                        >
                            Finalizare comandă
                        </Button>
                    </ThemeProvider>
                </Grid>

            </Grid>
        </>
        
    )
}