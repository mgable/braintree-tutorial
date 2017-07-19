var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  // var gateway = braintree.connect({
  //   environment: braintree.Environment.Sandbox,
  //   // Use your own credentials from the sandbox Control Panel here
  //   merchantId: 'c8myftrnjrch3kcn',
  //   publicKey: '5vtg8z8ddgfs47bn',
  //   privateKey: '5b668e366d39be33bc17e2f6b127b833'
  // });

   var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    // merchantId: 'c8myftrnjrch3kcn',
    // publicKey: '5vtg8z8ddgfs47bn',
    // privateKey: '5b668e366d39be33bc17e2f6b127b833',
   accessToken: 'access_token$sandbox$f6h57w5y34mz86jz$1e0c11990d13d5a0ea67be2e30625f91'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: req.body.amount,
    orderId: Date.now(),
    paymentMethodNonce: nonceFromTheClient,
    options: {
        paypal: {
        customField: "PayPal custom field",
        description: "Description for PayPal email receipt",
      },
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;