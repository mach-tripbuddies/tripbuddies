const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const { productCost, productValue } = req.body;

        if (!productCost || !productValue) {
            return res.status(400).send({ error: 'Missing required parameters: productCost or productValue' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: productCost, // Amount in the smallest currency unit (e.g., cents)
            currency: 'inr',
            description: productValue,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).send({ error: error.message });
    }
};

exports.handleWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Fulfill the purchase...
            break;
        default:
            return res.status(400).end();
    }

    res.json({ received: true });
};
