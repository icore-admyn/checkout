import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Select,
  MenuItem,
  Alert,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import card from '../../styles/card.module.css';
import StepIcon from '../../components/StepIcon';
import axios from 'axios';

import Chip from '../../assets/chip.svg'
import Visa from '../../assets/visa.svg'
import Mastercard from '../../assets/mastercard.svg'

import { styled } from '@mui/material/styles';

const steps = ['Details', 'Billing', 'Payment'];

export default function Form() {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [alert, setAlert] = useState({
    state: false,
    severity: 'error',
    message: ''
  });

  const [cardNumber1, setCardNumber1] = useState('');
  const [cardNumber2, setCardNumber2] = useState('');
  const [cardNumber3, setCardNumber3] = useState('');
  const [cardNumber4, setCardNumber4] = useState('');
  const cardNumber = `${cardNumber1} ${cardNumber2} ${cardNumber3} ${cardNumber4}`;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fullName = `${firstName} ${lastName}`;

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const [expirationMonth, setExpirationMonth] = useState(1);
  const [expirationYear, setExpirationYear] = useState(2025);
  const expiration =
    (expirationMonth || expirationYear) &&
    `${expirationMonth < 10 ? `0${expirationMonth}` : expirationMonth}/${String(expirationYear).substring(2)}`;

  const [ccv, setCcv] = useState('');

  const [cardType, setCardType] = useState('');
  const [cardBackground, setCardBackground] = useState('linear-gradient(135deg, #5e5e5e, #1e1e1e)');
  const [cardLogo, setCardLogo] = useState('')
  const cardTypes = [
    {
      name: 'mastercard',
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      logo: Mastercard
    },
    {
      name: 'visa',
      regex: /^4\d{0,15}/,
      logo: Visa
    },
  ]

  // Filp Card
  const [isCardFlipped, setCardFlipped] = useState(false);
  const handleCardClick = () => {
    setCardFlipped(!isCardFlipped);
  };

  const handleCardChange = (event) => {
    const { id, value, } = event.target;

    // Check if the current input has reached its maxLength
    if (value.length >= event.target.maxLength) {
      // Find the next input element with the next index
      const currentIndex = parseInt(id.split('-')[2]);
      const nextIndex = currentIndex + 1;
      const nextInput = document.getElementById(`card-number-${nextIndex}`);

      // Move focus to the next input if it exists
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Update state based on the input field
    switch (event.target.id) {
      case 'card-number-1':
        setCardFlipped(false)
        setCardNumber1(value);
        break;
      case 'card-number-2':
        setCardFlipped(false)
        setCardNumber2(value);
        break;
      case 'card-number-3':
        setCardFlipped(false)
        setCardNumber3(value);
        break;
      case 'card-number-4':
        setCardFlipped(false)
        setCardNumber4(value);
        break;
      case 'card-ccv':
        setCardFlipped(true)
        setCcv(value);
        break;
      default:
        setCardFlipped(false)
        break;
    }
    setCardType(handleCardType(cardNumber));
  };

  const handleCardType = (cardNumber) => {

    // Does card number match regex
    for (const type of cardTypes) {
      if (type.regex.test(cardNumber)) {
        handleCard(type.name)
        return type.name
      }
    }
    handleCard('')
    return ''
  }

  const handleCard = (cardType) => {
    switch (cardType) {
      case 'mastercard':
        setCardBackground('linear-gradient(135deg, #bd6772, #53223f)');
        setCardLogo(Mastercard);
        break;
      case 'visa':
        setCardBackground('linear-gradient(135deg, #3b3b9f, #191970)');
        setCardLogo(Visa)
        break;
      default:
        setCardBackground('linear-gradient(135deg, #5e5e5e, #1e1e1e)');
        setCardLogo('')
        break;
    }
  }


  const handleNext = () => {
    // Validation logic
    if (activeStep === 0) {
      if (!currency || !amount || !firstName || !lastName || !email || !phone) {
        // Display an error message or handle the validation failure appropriately
        setAlert({
          severity: 'error',
          message: 'Please fill in all required fields',
          state: true,
        });
        console.error("Please fill in all required fields");
        return;
      }
    }
    if (activeStep === 1) {
      if (!address || !country || !state || !city || !zip || !state) {
        // Display an error message or handle the validation failure appropriately
        setAlert({
          severity: 'error',
          message: 'Please fill in all required fields',
          state: true,
        });
        console.error("Please fill in all required fields");
        return;
      }
    }

    if (activeStep === 2) {
      if (!cardNumber1 || !cardNumber2 || !cardNumber3 || !cardNumber4 || !ccv) {
        // Display an error message or handle the validation failure appropriately
        setAlert({
          severity: 'error',
          message: 'Please fill in all required fields',
          state: true,
        });
        console.error("Please fill in all required fields");
        return;
      }
    }
    // If validation passes, proceed to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setAlert(prevAlert => ({
      ...prevAlert,
      state: false
    }));
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setAlert(prevAlert => ({
      ...prevAlert,
      state: false
    }));
  };

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

    try {
      const response = await axios.post('/api/direct', {
        firstName,
        lastName,
        address,
        country,
        state,
        city,
        zip,
        email,
        phone,
        amount,
        currency,
        cardNumber,
        expirationMonth,
        expirationYear,
        ccv,
      });

      // Handle the response as needed (e.g., show success message, redirect, etc.)
      console.log('Payment successful:', response.data);
      setIsLoading(false);
      setAlert({
        severity: 'success',
        message: response.data,
        state: true,
      })
      setIsSuccess(true)
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


  const ClearButton = styled(Button)(({ theme }) => ({
    color: '#05767A',
    '&:hover': {
      backgroundColor: '#0255590f',
    },
  }));

  function FormButtonClear({ children }) {
    return (
      <ClearButton onClick={handleNext} type='button'>{children}</ClearButton>
    );
  }

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

      {/* Display Card */}
      {activeStep >= steps.length - 1 && <div
        className={card.card}
        onClick={handleCardClick}
      >
        <div className={`${card.cardContent} ${isCardFlipped ? card.flipped : ''}`}>
          <div
            className={card.front}
            style={{ background: cardBackground }}
          >
            <img src={Chip} alt="" width={50} height={50} className={card.chip} />
            {cardType && <img src={cardLogo} alt="" width={100} height={30} className={card.cardLogoFront} />}
            <div className={card.cardNumber}>{cardNumber}</div>
            <div className={card.cardDetailsConatiner}>
              <div className={card.textContainer}>
                <span className={card.cardText}>CARD HOLDER</span>
                <span className={card.cardDetails}>{fullName}</span>
              </div>
              <div className={card.textContainer}>
                <span className={card.cardText}>EXPIRES</span>
                <span className={card.cardDetails}>{expiration}</span>
              </div>
            </div>
          </div>
          <div
            className={card.back}
            style={{ background: cardBackground }}
          >
            <div className={card.strip}></div>
            <div className={card.ccv}>{ccv}</div>
            {cardType && <img src={cardLogo} alt="" width={100} height={30} className={card.cardLogoBack} />}
          </div>
        </div>
      </div>
      }

      {!isSuccess ? (
        <>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel color={'red'}>
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
              {activeStep === 0 &&
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
                  <TextField
                    required
                    id="phone"
                    label="Phone Number"
                    type='phone'
                    fullWidth
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </Stack>
              }

              {/* STEP 2 */}
              {activeStep === 1 &&
                <Stack p={1} pt={4} gap={2}>
                  <TextField
                    required
                    id="address"
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                  />
                  <Stack direction={'row'} gap={2}>
                    <FormControl sx={{ width: '180px' }}>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId='country-label'
                        label='Country'
                        id="country"
                        value={country}
                        onChange={(e) => { setCountry(e.target.value) }}
                      >
                        <MenuItem value={'AF'}>Afghanistan</MenuItem>
                        <MenuItem value={'AL'}>Albania</MenuItem>
                        <MenuItem value={'DZ'}>Algeria</MenuItem>
                        <MenuItem value={'AD'}>Andorra</MenuItem>
                        <MenuItem value={'AO'}>Angola</MenuItem>
                        <MenuItem value={'AR'}>Argentina</MenuItem>
                        <MenuItem value={'AM'}>Armenia</MenuItem>
                        <MenuItem value={'AU'}>Australia</MenuItem>
                        <MenuItem value={'AT'}>Austria</MenuItem>
                        <MenuItem value={'AZ'}>Azerbaijan</MenuItem>
                        <MenuItem value={'BS'}>Bahamas</MenuItem>
                        <MenuItem value={'BH'}>Bahrain</MenuItem>
                        <MenuItem value={'BD'}>Bangladesh</MenuItem>
                        <MenuItem value={'BB'}>Barbados</MenuItem>
                        <MenuItem value={'BY'}>Belarus</MenuItem>
                        <MenuItem value={'BE'}>Belgium</MenuItem>
                        <MenuItem value={'BZ'}>Belize</MenuItem>
                        <MenuItem value={'BJ'}>Benin</MenuItem>
                        <MenuItem value={'BT'}>Bhutan</MenuItem>
                        <MenuItem value={'BO'}>Bolivia</MenuItem>
                        <MenuItem value={'BA'}>Bosnia and Herzegovina</MenuItem>
                        <MenuItem value={'BW'}>Botswana</MenuItem>
                        <MenuItem value={'BR'}>Brazil</MenuItem>
                        <MenuItem value={'BN'}>Brunei</MenuItem>
                        <MenuItem value={'BG'}>Bulgaria</MenuItem>
                        <MenuItem value={'BF'}>Burkina Faso</MenuItem>
                        <MenuItem value={'BI'}>Burundi</MenuItem>
                        <MenuItem value={'CV'}>Cabo Verde</MenuItem>
                        <MenuItem value={'KH'}>Cambodia</MenuItem>
                        <MenuItem value={'CM'}>Cameroon</MenuItem>
                        <MenuItem value={'CA'}>Canada</MenuItem>
                        <MenuItem value={'CF'}>Central African Republic</MenuItem>
                        <MenuItem value={'TD'}>Chad</MenuItem>
                        <MenuItem value={'CL'}>Chile</MenuItem>
                        <MenuItem value={'CN'}>China</MenuItem>
                        <MenuItem value={'CO'}>Colombia</MenuItem>
                        <MenuItem value={'KM'}>Comoros</MenuItem>
                        <MenuItem value={'CG'}>Congo</MenuItem>
                        <MenuItem value={'CR'}>Costa Rica</MenuItem>
                        <MenuItem value={'HR'}>Croatia</MenuItem>
                        <MenuItem value={'CU'}>Cuba</MenuItem>
                        <MenuItem value={'CY'}>Cyprus</MenuItem>
                        <MenuItem value={'CZ'}>Czechia</MenuItem>
                        <MenuItem value={'DK'}>Denmark</MenuItem>
                        <MenuItem value={'DJ'}>Djibouti</MenuItem>
                        <MenuItem value={'DM'}>Dominica</MenuItem>
                        <MenuItem value={'DO'}>Dominican Republic</MenuItem>
                        <MenuItem value={'EC'}>Ecuador</MenuItem>
                        <MenuItem value={'EG'}>Egypt</MenuItem>
                        <MenuItem value={'SV'}>El Salvador</MenuItem>
                        <MenuItem value={'GQ'}>Equatorial Guinea</MenuItem>
                        <MenuItem value={'ER'}>Eritrea</MenuItem>
                        <MenuItem value={'EE'}>Estonia</MenuItem>
                        <MenuItem value={'ET'}>Ethiopia</MenuItem>
                        <MenuItem value={'FJ'}>Fiji</MenuItem>
                        <MenuItem value={'FI'}>Finland</MenuItem>
                        <MenuItem value={'FR'}>France</MenuItem>
                        <MenuItem value={'GA'}>Gabon</MenuItem>
                        <MenuItem value={'GM'}>Gambia</MenuItem>
                        <MenuItem value={'GE'}>Georgia</MenuItem>
                        <MenuItem value={'DE'}>Germany</MenuItem>
                        <MenuItem value={'GH'}>Ghana</MenuItem>
                        <MenuItem value={'GR'}>Greece</MenuItem>
                        <MenuItem value={'GD'}>Grenada</MenuItem>
                        <MenuItem value={'GT'}>Guatemala</MenuItem>
                        <MenuItem value={'GN'}>Guinea</MenuItem>
                        <MenuItem value={'GW'}>Guinea-Bissau</MenuItem>
                        <MenuItem value={'GY'}>Guyana</MenuItem>
                        <MenuItem value={'HT'}>Haiti</MenuItem>
                        <MenuItem value={'HN'}>Honduras</MenuItem>
                        <MenuItem value={'HU'}>Hungary</MenuItem>
                        <MenuItem value={'IS'}>Iceland</MenuItem>
                        <MenuItem value={'IN'}>India</MenuItem>
                        <MenuItem value={'ID'}>Indonesia</MenuItem>
                        <MenuItem value={'IR'}>Iran</MenuItem>
                        <MenuItem value={'IQ'}>Iraq</MenuItem>
                        <MenuItem value={'IE'}>Ireland</MenuItem>
                        <MenuItem value={'IL'}>Israel</MenuItem>
                        <MenuItem value={'IT'}>Italy</MenuItem>
                        <MenuItem value={'JM'}>Jamaica</MenuItem>
                        <MenuItem value={'JP'}>Japan</MenuItem>
                        <MenuItem value={'JO'}>Jordan</MenuItem>
                        <MenuItem value={'KZ'}>Kazakhstan</MenuItem>
                        <MenuItem value={'KE'}>Kenya</MenuItem>
                        <MenuItem value={'KI'}>Kiribati</MenuItem>
                        <MenuItem value={'KW'}>Kuwait</MenuItem>
                        <MenuItem value={'KG'}>Kyrgyzstan</MenuItem>
                        <MenuItem value={'LA'}>Laos</MenuItem>
                        <MenuItem value={'LV'}>Latvia</MenuItem>
                        <MenuItem value={'LB'}>Lebanon</MenuItem>
                        <MenuItem value={'LS'}>Lesotho</MenuItem>
                        <MenuItem value={'LR'}>Liberia</MenuItem>
                        <MenuItem value={'LY'}>Libya</MenuItem>
                        <MenuItem value={'LI'}>Liechtenstein</MenuItem>
                        <MenuItem value={'LT'}>Lithuania</MenuItem>
                        <MenuItem value={'LU'}>Luxembourg</MenuItem>
                        <MenuItem value={'MG'}>Madagascar</MenuItem>
                        <MenuItem value={'MW'}>Malawi</MenuItem>
                        <MenuItem value={'MY'}>Malaysia</MenuItem>
                        <MenuItem value={'MV'}>Maldives</MenuItem>
                        <MenuItem value={'ML'}>Mali</MenuItem>
                        <MenuItem value={'MT'}>Malta</MenuItem>
                        <MenuItem value={'MH'}>Marshall Islands</MenuItem>
                        <MenuItem value={'MR'}>Mauritania</MenuItem>
                        <MenuItem value={'MU'}>Mauritius</MenuItem>
                        <MenuItem value={'MX'}>Mexico</MenuItem>
                        <MenuItem value={'FM'}>Micronesia</MenuItem>
                        <MenuItem value={'MD'}>Moldova</MenuItem>
                        <MenuItem value={'MC'}>Monaco</MenuItem>
                        <MenuItem value={'MN'}>Mongolia</MenuItem>
                        <MenuItem value={'ME'}>Montenegro</MenuItem>
                        <MenuItem value={'MA'}>Morocco</MenuItem>
                        <MenuItem value={'MZ'}>Mozambique</MenuItem>
                        <MenuItem value={'MM'}>Myanmar</MenuItem>
                        <MenuItem value={'NA'}>Namibia</MenuItem>
                        <MenuItem value={'NR'}>Nauru</MenuItem>
                        <MenuItem value={'NP'}>Nepal</MenuItem>
                        <MenuItem value={'NL'}>Netherlands</MenuItem>
                        <MenuItem value={'NZ'}>New Zealand</MenuItem>
                        <MenuItem value={'NI'}>Nicaragua</MenuItem>
                        <MenuItem value={'NE'}>Niger</MenuItem>
                        <MenuItem value={'NG'}>Nigeria</MenuItem>
                        <MenuItem value={'KP'}>North Korea</MenuItem>
                        <MenuItem value={'MK'}>North Macedonia</MenuItem>
                        <MenuItem value={'NO'}>Norway</MenuItem>
                        <MenuItem value={'OM'}>Oman</MenuItem>
                        <MenuItem value={'PK'}>Pakistan</MenuItem>
                        <MenuItem value={'PW'}>Palau</MenuItem>
                        <MenuItem value={'PS'}>Palestine</MenuItem>
                        <MenuItem value={'PA'}>Panama</MenuItem>
                        <MenuItem value={'PG'}>Papua New Guinea</MenuItem>
                        <MenuItem value={'PY'}>Paraguay</MenuItem>
                        <MenuItem value={'PE'}>Peru</MenuItem>
                        <MenuItem value={'PH'}>Philippines</MenuItem>
                        <MenuItem value={'PL'}>Poland</MenuItem>
                        <MenuItem value={'PT'}>Portugal</MenuItem>
                        <MenuItem value={'QA'}>Qatar</MenuItem>
                        <MenuItem value={'RO'}>Romania</MenuItem>
                        <MenuItem value={'RU'}>Russia</MenuItem>
                        <MenuItem value={'RW'}>Rwanda</MenuItem>
                        <MenuItem value={'KN'}>Saint Kitts and Nevis</MenuItem>
                        <MenuItem value={'LC'}>Saint Lucia</MenuItem>
                        <MenuItem value={'VC'}>Saint Vincent and the Grenadines</MenuItem>
                        <MenuItem value={'WS'}>Samoa</MenuItem>
                        <MenuItem value={'SM'}>San Marino</MenuItem>
                        <MenuItem value={'ST'}>Sao Tome and Principe</MenuItem>
                        <MenuItem value={'SA'}>Saudi Arabia</MenuItem>
                        <MenuItem value={'SN'}>Senegal</MenuItem>
                        <MenuItem value={'RS'}>Serbia</MenuItem>
                        <MenuItem value={'SC'}>Seychelles</MenuItem>
                        <MenuItem value={'SL'}>Sierra Leone</MenuItem>
                        <MenuItem value={'SG'}>Singapore</MenuItem>
                        <MenuItem value={'SK'}>Slovakia</MenuItem>
                        <MenuItem value={'SI'}>Slovenia</MenuItem>
                        <MenuItem value={'SB'}>Solomon Islands</MenuItem>
                        <MenuItem value={'SO'}>Somalia</MenuItem>
                        <MenuItem value={'ZA'}>South Africa</MenuItem>
                        <MenuItem value={'KR'}>South Korea</MenuItem>
                        <MenuItem value={'SS'}>South Sudan</MenuItem>
                        <MenuItem value={'ES'}>Spain</MenuItem>
                        <MenuItem value={'LK'}>Sri Lanka</MenuItem>
                        <MenuItem value={'SD'}>Sudan</MenuItem>
                        <MenuItem value={'SR'}>Suriname</MenuItem>
                        <MenuItem value={'SZ'}>Eswatini</MenuItem>
                        <MenuItem value={'SE'}>Sweden</MenuItem>
                        <MenuItem value={'CH'}>Switzerland</MenuItem>
                        <MenuItem value={'SY'}>Syria</MenuItem>
                        <MenuItem value={'TW'}>Taiwan</MenuItem>
                        <MenuItem value={'TJ'}>Tajikistan</MenuItem>
                        <MenuItem value={'TZ'}>Tanzania</MenuItem>
                        <MenuItem value={'TH'}>Thailand</MenuItem>
                        <MenuItem value={'TL'}>Timor-Leste</MenuItem>
                        <MenuItem value={'TG'}>Togo</MenuItem>
                        <MenuItem value={'TO'}>Tonga</MenuItem>
                        <MenuItem value={'TT'}>Trinidad and Tobago</MenuItem>
                        <MenuItem value={'TN'}>Tunisia</MenuItem>
                        <MenuItem value={'TR'}>Turkey</MenuItem>
                        <MenuItem value={'TM'}>Turkmenistan</MenuItem>
                        <MenuItem value={'TV'}>Tuvalu</MenuItem>
                        <MenuItem value={'UG'}>Uganda</MenuItem>
                        <MenuItem value={'UA'}>Ukraine</MenuItem>
                        <MenuItem value={'AE'}>United Arab Emirates</MenuItem>
                        <MenuItem value={'GB'}>United Kingdom</MenuItem>
                        <MenuItem value={'US'}>United States</MenuItem>
                        <MenuItem value={'UY'}>Uruguay</MenuItem>
                        <MenuItem value={'UZ'}>Uzbekistan</MenuItem>
                        <MenuItem value={'VU'}>Vanuatu</MenuItem>
                        <MenuItem value={'VA'}>Vatican City</MenuItem>
                        <MenuItem value={'VE'}>Venezuela</MenuItem>
                        <MenuItem value={'VN'}>Vietnam</MenuItem>
                        <MenuItem value={'YE'}>Yemen</MenuItem>
                        <MenuItem value={'ZM'}>Zambia</MenuItem>
                        <MenuItem value={'ZW'}>Zimbabwe</MenuItem>

                      </Select>
                    </FormControl>
                    <TextField
                      required
                      id="state"
                      label="State"
                      fullWidth
                      value={state}
                      onChange={(e) => { setState(e.target.value) }}
                    />
                  </Stack>
                  <Stack direction={'row'} gap={2}>
                    <TextField
                      required
                      id="city"
                      label="City"
                      fullWidth
                      value={city}
                      onChange={(e) => { setCity(e.target.value) }}
                    />
                    <TextField
                      required
                      id="zip"
                      label="Zip Code"
                      fullWidth
                      value={zip}
                      onChange={(e) => { setZip(e.target.value) }}
                    />
                  </Stack>
                </Stack>
              }

              {/* STEP 3 */}
              {activeStep === 2 &&
                <Stack p={1} pt={4} gap={2}>
                  <div>
                    <InputLabel shrink htmlFor="card-number-1">
                      Card Number*
                    </InputLabel>
                    <Stack direction={'row'} gap={2}>
                      <TextField
                        required
                        id="card-number-1"
                        type='num'
                        sx={{ maxWidth: '100px' }}
                        inputProps={{ maxLength: 4 }}
                        value={cardNumber1}
                        onChange={(e) => { handleCardChange(e) }}
                      />
                      <TextField
                        required
                        id="card-number-2"
                        type='num'
                        sx={{ maxWidth: '100px' }}
                        inputProps={{ maxLength: 4 }}
                        value={cardNumber2}
                        onChange={(e) => { handleCardChange(e) }}
                      />
                      <TextField
                        required
                        id="card-number-3"
                        type='num'
                        sx={{ maxWidth: '100px' }}
                        inputProps={{ maxLength: 4 }}
                        value={cardNumber3}
                        onChange={(e) => { handleCardChange(e) }}
                      />
                      <TextField
                        required
                        id="card-number-4"
                        type='num'
                        sx={{ maxWidth: '100px' }}
                        inputProps={{ maxLength: 4 }}
                        value={cardNumber4}
                        onChange={(e) => { handleCardChange(e) }}
                      />
                    </Stack>
                  </div>
                  <Stack direction={'row'} gap={2} justifyContent={'space-between'}>
                    <div>
                      <InputLabel shrink htmlFor="card-expiration-month">
                        Expiration Date*
                      </InputLabel>
                      <Stack direction={'row'} gap={2}>
                        <Select
                          id="card-expiration-month"
                          value={expirationMonth}
                          onChange={(e) => { setExpirationMonth(e.target.value) }}
                        >
                          <MenuItem value={1}>01</MenuItem>
                          <MenuItem value={2}>02</MenuItem>
                          <MenuItem value={3}>03</MenuItem>
                          <MenuItem value={4}>04</MenuItem>
                          <MenuItem value={5}>05</MenuItem>
                          <MenuItem value={6}>06</MenuItem>
                          <MenuItem value={7}>07</MenuItem>
                          <MenuItem value={8}>08</MenuItem>
                          <MenuItem value={9}>09</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={11}>11</MenuItem>
                          <MenuItem value={12}>12</MenuItem>
                        </Select>
                        <Select
                          id="card-expiration-year"
                          value={expirationYear}
                          onChange={(e) => { setExpirationYear(e.target.value) }}
                        >
                          <MenuItem value={2024}>2024</MenuItem>
                          <MenuItem value={2025}>2025</MenuItem>
                          <MenuItem value={2026}>2026</MenuItem>
                          <MenuItem value={2027}>2027</MenuItem>
                          <MenuItem value={2028}>2028</MenuItem>
                          <MenuItem value={2029}>2029</MenuItem>
                          <MenuItem value={2030}>2030</MenuItem>
                          <MenuItem value={2031}>2031</MenuItem>
                          <MenuItem value={2032}>2032</MenuItem>
                          <MenuItem value={2033}>2033</MenuItem>
                          <MenuItem value={2034}>2034</MenuItem>
                          <MenuItem value={2035}>2035</MenuItem>
                          <MenuItem value={2036}>2036</MenuItem>
                          <MenuItem value={2037}>2037</MenuItem>
                          <MenuItem value={2038}>2038</MenuItem>
                          <MenuItem value={2039}>2039</MenuItem>
                          <MenuItem value={2040}>2040</MenuItem>
                        </Select>
                      </Stack>
                    </div>
                    <div>
                      <InputLabel shrink htmlFor="card-ccv">
                        CVV*
                      </InputLabel>
                      <TextField
                        required
                        id="card-ccv"
                        sx={{ width: '100px' }}
                        inputProps={{ maxLength: 3 }}
                        value={ccv}
                        onChange={(e) => { handleCardChange(e) }}
                      />
                    </div>
                  </Stack>
                </Stack>
              }

              {activeStep === steps.length &&
                <Typography sx={{ m: 0 }}>
                  <Grid container spacing={1} mt={2} p={2}
                    sx={{
                      maxHeight: '200px',
                      overflow: 'scroll',
                      boxSizing: 'border-box',
                      border: '1px solid #0255590f',
                      borderRadius: '8px',
                      '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#05767A', borderRadius: '100px' },
                      [theme.breakpoints.down('sm')]: {
                        p: 0,
                        borderRadius: 0,
                        maxHeight: 'none',
                        border: 'none'
                      },
                    }}>
                    <Grid item xs={4}>
                      <Box>Currency:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{currency}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Amount:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{amount}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>First Name:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{firstName}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Last Name:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{lastName}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Email:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{email}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Phone:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{phone}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Address:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{address}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Country:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{country}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Sate:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{state}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>City:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{city}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Zip:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{zip}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Card No:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{cardNumber}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>Expiration Date:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{expiration}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box>CCV:</Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>{ccv}</Box>
                    </Grid>
                  </Grid>
                </Typography>
              }


              {/* Buttons */}
              <Box Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep === steps.length ?
                  <FormButtonColor>
                    Pay Now
                  </FormButtonColor>
                  :
                  <FormButtonClear>
                    Next
                  </FormButtonClear>
                }

              </Box>
              {alert.state &&
                <Alert sx={{ mt: 2 }} severity={alert.severity}>{alert.message}</Alert>
              }

            </Box>

          </Fragment >
        </>
      ) : (
        <Alert sx={{ mt: 2 }} severity={alert.severity}>{alert.message}</Alert>
      )
      }
    </Box >
  );
}