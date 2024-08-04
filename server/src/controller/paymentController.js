import gateway from "../config/braintree.js";

export const generateToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response.clientToken);
    }
  });
};

export const processPayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const amount = req.body.amount; // Adjust this as needed

  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err || !result.success) {
        res.status(500).send(err || result.message);
      } else {
        res.send(result);
      }
    }
  );
};
