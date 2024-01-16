const hostedApi = async (req, res) => {
    try {

        const data = req.body;
        console.log(data);
        return res.status(200).send('Message Recieved')
    } catch (error) {

        console.error('There was an unexpected error', error);
        res.status(500).send('There was an unexpected error', error)
    }
};

module.exports = hostedApi