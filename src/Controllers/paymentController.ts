const stripe = require("stripe")(process.env.API_KEY);

const customer = async (req:any, res:any) => {
    const { products } = req.body;
    const lineItems = products.map((product:any) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.productName,
          images:[product.productImg],
          description:product.description
        },
        unit_amount: product.productPrice*100, // Convert to cents
      },
      quantity: product.quantity,
    }));
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Replace with your actual success URL
        cancel_url: 'http://localhost:3000/cancel',   // Replace with your actual cancel URL
      });
  
      res.json({ id: session.id });
    } catch (error:any) {
      console.error('Error creating Stripe checkout session:', error.message);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  };

module.exports = { customer };
