import 'dotenv/config'
import Stripe from "stripe";
const stripe = new Stripe(process.env.PRIVATE_KEY);

const createCheckoutSession1 = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: "tv test",
                            description: "tv test",
                        },
                        currency: "usd",
                        unit_amount: 10000, // ,00

                    },
                    quantity: 1
                },
                {
                    price_data: {
                        product_data: {
                            name: "mouse test",
                            description: "mouse test",
                        },
                        currency: "usd",
                        unit_amount: 10000, 

                    },
                    quantity: 1
                }
            ],
            mode: "payment", // pago de una sola vez
            //mode: "subscription", // pago si es un curso o algo q se pagaria cada mes
            success_url: "http://localhost:3005/payment/success",
            cancel_url: "http://localhost:3005/payment/cancel",
        })

        return res.json(session)
    } catch (error) {
        console.log(error.raw.message)
        res.status(500).json({ error: error, message: error.raw.message });
    }
}

const createCheckoutSession = async (req, res) => {
    const { priceId } = req.body
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: "tv test",
                            description: "tv test",
                        },
                        currency: "usd",
                        unit_amount: 10000, // ,00

                    },
                    quantity: 1
                },
                {
                    price_data: {
                        product_data: {
                            name: "mouse test",
                            description: "mouse test",
                        },
                        currency: "usd",
                        unit_amount: 10000, 

                    },
                    quantity: 1
                }
            ],
            mode: "payment", // pago de una sola vez
            //mode: "subscription", // pago si es un curso o algo q se pagaria cada mes
            success_url: "http://localhost:3005/payment/success",
            cancel_url: "http://localhost:3005/payment/cancel",
        })

        return res.json(session)
    } catch (error) {
        console.log(error.raw.message)
        res.status(500).json({ error: error, message: error.raw.message });
    }
}
/* ------------------------------------- */

const getSubscriptions = async (req, res) => {
    try {
        const prices = await stripe.prices.list()
        const sortedPrices = prices.data.sort((a, b) => a.unit_amount - b.unit_amount)
        return res.json(sortedPrices)
    } catch (error) {
        console.log(error.raw.message)
        res.status(500).json({ error: error, message: error.raw.message });
    }
}

const postSubscriptions = async (req, res) => {
    try {
        const { priceId } = req.body

        const session = await stripe.checkout.sessions.create({
            mode: "subscription", // one time payment = payment, subscription = subscription
            success_url: "http://localhost:3005/payment/success",
            cancel_url: "http://localhost:5173/",
            payment_method_types: ["paypal", "card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                },
            ],
        })


        return res.json({ message: "success", priceId, session })

    } catch (error) {
        console.log(error.raw.message)
        res.status(500).json({ error: error, message: error.raw.message });
    }
}

/* ------------------------------------- */

const successPayment = async (req, res) => {
    res.json({ message: "successPayment" })
}

const cancelPayment = async (req, res) => {
    res.json({ message: "cancelPayment" })
}

export default {
    createCheckoutSession,
    successPayment,
    cancelPayment,
    getSubscriptions,
    postSubscriptions
}

/* 
    const { id, amount, description } = req.body;
    const payment = await stripe.paymentIntents.create({
        payment_method: id,
        amount: amount,
        currency: "USD",
        description: description,
        confirm: true,
    });

    res.status(200).send({
        payment: payment,
    });
*/