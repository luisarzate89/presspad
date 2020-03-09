const stripe = jest.genMockFromModule('stripe');

stripe.paymentIntents = {
  create: () => ({ status: 'succeeded' }),
  confirm: () => ({ status: 'succeeded' }),
};

module.exports = () => stripe;
