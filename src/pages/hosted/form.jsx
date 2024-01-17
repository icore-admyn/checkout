import {
    Stack,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Button,
    styled,
    Alert
} from '@mui/material';
import StepIcon from '../../components/StepIcon';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const steps = ['Details', 'Payment'];

export default function Form() {

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        state: false,
        severity: 'error',
        message: ''
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (alert.state) {
            // Set a timeout to turn off the alert after 4 seconds
            const timeoutId = setTimeout(() => {
                setAlert(prevAlert => ({
                    ...prevAlert,
                    state: false
                }));
            }, 4000);

            // Clear the timeout if the component unmounts or if alert state changes
            return () => clearTimeout(timeoutId);
        }
    }, [alert.state]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)


        if (!currency || !amount || !firstName || !lastName || !email) {
            // Display an error message or handle the validation failure appropriately
            setAlert({
                severity: 'error',
                message: 'Please fill in all required fields',
                state: true,
            });
            setIsLoading(false)
            console.error("Please fill in all required fields");
            return;
        }


        try {
            const response = await axios.post('/api/hosted', {
                firstName,
                lastName,
                email,
                amount,
                currency,
            });

            // Handle the response as needed (e.g., show success message, redirect, etc.)
            console.log('Payment successful:', response.data);
            setIsLoading(false);
            window.location.href = response.data;
        } catch (error) {
            // Handle errors (e.g., show error message)
            console.error('Payment failed:', error.response.data);
            setIsLoading(false);
            setAlert({
                severity: 'error',
                message: error.response.data,
                state: true,
            })
        }
    };



    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#05767A'),
        backgroundColor: isLoading ? 'white' : '#05767A',
        '&:hover': {
            backgroundColor: isLoading ? 'white' : '#025558',
        },
        paddingInline: '14px',
    }));

    function FormButtonColor({ children }) {
        return (
            <ColorButton
                onClick={handleSubmit}
                type='submit'
                disabled={isLoading}
            >
                {children}
            </ColorButton>
        );
    }


    return (
        <Box sx={{ width: '100%' }}>
            <>
                {/* Stepper */}
                <Stepper activeStep={0} alternativeLabel color={'red'}>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps} StepIconComponent={StepIcon}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <Fragment>
                    <Box component={'form'}>
                        {/* STEP 1 */}
                        <Stack p={1} pt={4} gap={2}>
                            <Stack direction={'row'} gap={2}>
                                <FormControl sx={{ width: '180px' }}>
                                    <InputLabel id="currency-label">Currency</InputLabel>
                                    <Select
                                        labelId='currency-label'
                                        label='Currency'
                                        id="currency"
                                        value={currency}
                                        onChange={(e) => { setCurrency(e.target.value) }}
                                    >
                                        <MenuItem value={'USD'}>USD</MenuItem>
                                        <MenuItem value={'EUR'}>EUR</MenuItem>
                                        <MenuItem value={'JPY'}>JPY</MenuItem>
                                        <MenuItem value={'GBP'}>GBP</MenuItem>
                                        <MenuItem value={'AUD'}>AUD</MenuItem>
                                        <MenuItem value={'CAD'}>CAD</MenuItem>
                                        <MenuItem value={'CHF'}>CHF</MenuItem>
                                        <MenuItem value={'CNY'}>CNY</MenuItem>
                                        <MenuItem value={'SEK'}>SEK</MenuItem>
                                        <MenuItem value={'NZD'}>NZD</MenuItem>
                                        <MenuItem value={'NOK'}>NOK</MenuItem>
                                        <MenuItem value={'SGD'}>SGD</MenuItem>
                                        <MenuItem value={'KRW'}>KRW</MenuItem>
                                        <MenuItem value={'TRY'}>TRY</MenuItem>
                                        <MenuItem value={'INR'}>INR</MenuItem>
                                        <MenuItem value={'BRL'}>BRL</MenuItem>
                                        <MenuItem value={'ZAR'}>ZAR</MenuItem>
                                        <MenuItem value={'RUB'}>RUB</MenuItem>
                                        <MenuItem value={'HKD'}>HKD</MenuItem>
                                        <MenuItem value={'MXN'}>MXN</MenuItem>
                                        <MenuItem value={'IDR'}>IDR</MenuItem>
                                        <MenuItem value={'MYR'}>MYR</MenuItem>
                                        <MenuItem value={'PHP'}>PHP</MenuItem>
                                        <MenuItem value={'THB'}>THB</MenuItem>
                                        <MenuItem value={'PLN'}>PLN</MenuItem>
                                        <MenuItem value={'HUF'}>HUF</MenuItem>
                                        <MenuItem value={'DKK'}>DKK</MenuItem>
                                        <MenuItem value={'CZK'}>CZK</MenuItem>
                                        <MenuItem value={'ILS'}>ILS</MenuItem>
                                        <MenuItem value={'CLP'}>CLP</MenuItem>
                                        <MenuItem value={'AED'}>AED</MenuItem>
                                        <MenuItem value={'SAR'}>SAR</MenuItem>
                                        <MenuItem value={'EGP'}>EGP</MenuItem>
                                        <MenuItem value={'QAR'}>QAR</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    required
                                    id="amount"
                                    label="Amount"
                                    fullWidth
                                    type='number'
                                    value={amount}
                                    onChange={(e) => { setAmount(e.target.value) }}
                                />
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <TextField
                                    required
                                    id="first-name"
                                    label="First Name"
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                />
                                <TextField
                                    required
                                    id="last-name"
                                    label="Last Name"
                                    fullWidth
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                />
                            </Stack>
                            <TextField
                                required
                                id="email"
                                label="Email Address"
                                type='email'
                                fullWidth
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Stack>


                        {/* Buttons */}
                        <Box Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'right' }}>
                            <FormButtonColor
                                sx={{
                                    ml: 'auto'
                                }}
                            >
                                Pay Now
                            </FormButtonColor>
                        </Box>


                        {alert.state &&
                            <Alert sx={{ mt: 2 }} severity={alert.severity}>{alert.message}</Alert>
                        }
                    </Box>
                </Fragment>
            </>
        </Box>
    );
}
