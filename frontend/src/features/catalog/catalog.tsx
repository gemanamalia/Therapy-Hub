import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors} from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() =>{
    //     fetch('http://localhost:5000/api/products')
    //     .then(response => response.json())
    //     .then(data => setProducts(data))
    // }, [])

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect (() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch] )

    if (status.includes('pending')) return <LoadingComponent message='Loading products...'/>;
    
        return (
            <>
             <ProductList products={products} />  
            </>
        )
}