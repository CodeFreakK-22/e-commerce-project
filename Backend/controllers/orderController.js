import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing an order using COD

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed Successfully" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}


// placing an order using strpe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

//verify stripe
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        console.log("VERIFY BODY:", req.body);

        if (!orderId) {
            return res.json({ success: false, message: "OrderId missing" });
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (success === "true") {
            order.payment = true;
            await order.save();

            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

            return res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false });
        }

    } catch (error) {
        console.log("VERIFY ERROR:", error);
        return res.json({ success: false, message: error.message });
    }
};


// placing an order using razorpay
const placeOrderRazorpay = async (req, res) => {


}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

// All orders data for frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// All orders data status from admin panel
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }