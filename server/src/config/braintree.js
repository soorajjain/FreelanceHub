import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "797bs34sqj8543n8",
  publicKey: "d5z2qw8k7wrgjq8x",
  privateKey: "cff3654402ef6485a76ea70969e5eb60",
});

// const gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox, // Change to Production for live transactions
//     merchantId: process.env.BRAINTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY,
//   });

export default gateway;
