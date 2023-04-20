import { Grid, Paper, Typography} from "@mui/material";
import { useEffect } from "react";
import AddPagination from "../../app/components/AddPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import "./Catalog.css";


const sortOptions = [
    {value: 'name', label: 'Alfabetic'},
    {value: 'price', label: 'Preț crescător'},
    {value: 'priceDesc', label: 'Preț descrescător'},
]
export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() =>{
    //     fetch('http://localhost:5000/api/products')
    //     .then(response => response.json())
    //     .then(data => setProducts(data))
    // }, [])

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect (() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() =>{
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])


    if (!filtersLoaded) return <LoadingComponent message='Loading products...'/>;
    
        return (
            <>
               <h1 className="catalog-title">Cărți pentru minte și suflet</h1>

                <Grid container columnSpacing={4}>
                    <Grid item xs={3}>
                        <Paper sx={{mb: 2}}>
                            <ProductSearch />
                        </Paper>
                    
                        <Paper sx={{ mb: 2, p: 2}} 
                            style={{ boxShadow: '0px 1px 9px  rgba(0,0,0,0.5)' }}
                        >
                        <Typography>Order:</Typography>
                        <RadioButtonGroup 
                                selectedValue={productParams.orderBy}
                                options={sortOptions}
                                onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))} 
                        />
                        </Paper>

                        <Paper sx={{ mb: 2, p: 2}}
                            style={{ boxShadow: '0px 1px 9px  rgba(0,0,0,0.5)' }}
                        >                      
                            <Typography>Filter by brand:</Typography>
                            <CheckboxButtons 
                                items={brands}
                                checked={productParams.brands}
                                onChange={(items: string[]) => dispatch(setProductParams({brands : items}))}    
                            />
                        </Paper>

                        <Paper sx={{ mb: 2, p: 2}}
                            style={{ boxShadow: '0px 1px 9px  rgba(0,0,0,0.5)' }}
                        >
                            <Typography>Filter by product:</Typography>
                            <CheckboxButtons 
                                items={types}
                                checked={productParams.types}
                                onChange={(items: string[]) => dispatch(setProductParams({types : items}))}    
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={9}>
                    <ProductList products={products} />  
                    </Grid>

                    <Grid item xs={3} />

                    <Grid item xs={9} sx={{mb: 2}}>
                        { metaData &&
                        <AddPagination 
                            metaData={metaData}
                            onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                        /> }
                    </Grid>
                
                </Grid>
            </>
        )
}