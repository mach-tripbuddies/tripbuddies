const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    console.log('Request body:', req.body);
    const { productCost, productValue } = req.body;

    if (!productCost || !productValue) {
        return res.status(400).send({ error: 'Missing required parameters: productCost or productValue' });
    }
    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Goa',
                        },
                        unit_amount: 703000,
                    },
                    quantity: 1,
                },
            ],
            allow_promotion_codes: true,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error: ${error.message}`);
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
