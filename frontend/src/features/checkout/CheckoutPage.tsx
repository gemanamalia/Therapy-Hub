import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./CheckoutValidation";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from '@stripe/stripe-js';
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#523a25',
      }
    },
  });



const steps = ['Adresă de livrare', 'Rezumat comandă', 'Detalii plată'];


export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?: string}}>({elementError: {}});
    const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false});
    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const { basket } = useAppSelector(state => state.basket);
    const stripe = useStripe();
    const elements = useElements();

    function onCardInputChange(event: any) {
        setCardState({
        ...cardState,
        elementError: {
            ...cardState.elementError,
            [event.elementType]: event.error?.message
        }
        })
        setCardComplete({...cardComplete, [event.elementType]: event.complete});
    }

    
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />;
            default:
                throw new Error('Unknown step');
        }
    }
  
    
    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentValidationSchema)
    });

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response) {
                    methods.reset({...methods.getValues(), ...response, saveAddress: false})
                }
            })
    }, [methods])

    async function submitOrder(data: FieldValues) {
        setLoading(true);
        const { nameOnCard, saveAddress, ...address } = data;
        if (!stripe || !elements) return; // stripe not ready
        try {
            const cardElement = elements.getElement(CardNumberElement);
            const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            });
            console.log(paymentResult);
            if (paymentResult.paymentIntent?.status === 'succeeded') {
                const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress: address });
                setOrderNumber(orderNumber);
                setPaymentSucceeded(true);
                setPaymentMessage('Mulțumim - comanda a fost înregistrată!');
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setLoading(false);
            } else {
                setPaymentMessage(paymentResult.error?.message!);
                setPaymentSucceeded(false);
                setLoading(false);
                setActiveStep(activeStep + 1);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    
    const handleNext = async (data: FieldValues) => {
        if (activeStep === steps.length - 1) {
           await submitOrder(data);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function submitDisabled(): boolean {
        if (activeStep === steps.length - 1) {
            return !cardComplete.cardCvc
                || !cardComplete.cardExpiry
                || !cardComplete.cardNumber
                || !methods.formState.isValid
        } else {
            return !methods.formState.isValid
        }
    }

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Typography component="h1" variant="h4" align="center">
                    Finalizare comandă
                </Typography>
                <Stepper activeStep={activeStep} 
                    sx={{
                        pt: 5,
                        pb: 5,
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                {paymentMessage}
                            </Typography>
                            {paymentSucceeded ? (
                                <Typography variant="subtitle1">
                                    Numărul comenzii tale este #{orderNumber}. Vei primi confirmarea comenzii pe email în cel mai scurt timp posibil.  
                                </Typography>
                            ): (
                                <Button variant="contained" onClick={handleBack} >
                                    Ne pare rău - încearcă din nou
                                </Button>
                            )}
                            
                        </>
                        ) : (
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}

                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{mt: 3, ml: 1}} style={{backgroundColor: '#523a25', color: '#fff'}}>
                                        Înapoi
                                    </Button>
                                )}
                                <ThemeProvider theme={theme}>
                                    <LoadingButton
                                        loading={loading}
                                        disabled={submitDisabled()}
                                        variant="contained"
                                        type='submit'
                                        sx={{mt: 3, ml: 1}}
                                        color={'primary'}
                                    >
                                        {activeStep === steps.length - 1 ? 'Plasează comanda' : 'Continuă'}
                                    </LoadingButton>
                                </ThemeProvider>

                            </Box>
                        </form>
                    )}
                </>
           </Paper>
        </FormProvider>
    );
}

