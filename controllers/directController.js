const axios = require('axios');
require('dotenv').config();

const url = process.env.API_DIRECT_URL;
const apiKey = process.env.API_TOKEN;

const directApi = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            first_name: body.firstName,
            last_name: body.lastName,
            address: body.address,
            customer_order_id: Math.random(),
            country: body.country,
            state: body.state,
            city: body.city,
            zip: body.zip,
            ip_address: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            email: body.email,
            phone_no: body.phone,
            amount: body.amount,
            currency: body.currency,
            card_no: body.cardNumber,
            ccExpiryMonth: body.expirationMonth,
            ccExpiryYear: body.expirationYear,
            cvvNumber: parseInt(body.ccv, 10),
            response_url: 'https://demo.gatewaypay.io'
        };

        console.log(data);

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        const responseData = response.data;
        console.log(responseData);
        if (responseData.responseCode === '1') {
            // res.redirect(responseData.redirect_3ds_url);
            console.log("Your transaction was approved.");
            res.status(200).send(responseData.responseMessage);
        } else if (responseData.responseCode === '2') {
            console.log("Your transaction was approved.");
            res.status(200).send(responseData.responseMessage);
        } else {
            console.log("Your transaction was declined");
            res.status(401).send(responseData.responseMessage);
        }
    } catch (error) {
        console.error('There was an unexpected error', error);
        res.status(400).send('Invalid input data: ' + error.message);
    }
};

module.exports = directApi;
