const paymentMethod = {
  id: 'pm_1GDU8eDfm5MEAc97hLgEL9yQ',
  object: 'payment_method',
  billing_details: {
    address: {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postal_code: '42424',
      state: null,
    },
    email: null,
    name: null,
    phone: null,
  },
  card: {
    brand: 'visa',
    checks: {
      address_line1_check: null,
      address_postal_code_check: null,
      cvc_check: null,
    },
    country: 'US',
    exp_month: 4,
    exp_year: 2024,
    funding: 'credit',
    generated_from: null,
    last4: '4242',
    three_d_secure_usage: { supported: true },
    wallet: null,
  },
  created: 1582024877,
  customer: null,
  livemode: false,
  metadata: {},
  type: 'card',
};

module.exports = {
  paymentMethod,
};
