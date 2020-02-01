const generatePaymentResponse = async intent => {
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  }
  if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    return {
      success: true,
    };
  }
  // Invalid status
  return {
    error: 'Invalid PaymentIntent status',
  };
};

module.exports = generatePaymentResponse;
