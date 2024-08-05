import React, { useEffect, useRef, useState } from "react";
import dropin from "braintree-web-drop-in";
import { Button } from "reactstrap";

export default function BraintreeDropIn({ show, onPaymentCompleted }) {
  const [braintreeReady, setBraintreeReady] = useState(false);
  const braintreeInstanceRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => {
    console.log("hi");

    const initializeBraintree = () => {
      if (containerRef.current) {
        dropin.create(
          {
            authorization: "sandbox_hc82khtp_797bs34sqj8543n8", // Replace with your actual tokenization key
            // container: containerRef.current,
            selector: "#dropin-container",
          },
          (error, instance) => {
            if (error) {
              console.error("Error initializing Braintree:", error);
            } else {
              braintreeInstanceRef.current = instance;
              setBraintreeReady(true);
            }
          }
        );
      }
    };

    if (show) {
      if (braintreeInstanceRef.current) {
        braintreeInstanceRef.current
          .teardown()
          .then(() => {
            containerRef.current.innerHTML = ""; // Ensure the container is empty
            initializeBraintree();
          })
          .catch((error) =>
            console.error("Error tearing down Braintree instance:", error)
          );
      } else {
        containerRef.current.innerHTML = ""; // Ensure the container is empty
        initializeBraintree();
      }
    }

    return () => {
      if (braintreeInstanceRef.current) {
        braintreeInstanceRef.current
          .teardown()
          .then(() => {
            braintreeInstanceRef.current = null;
          })
          .catch((error) =>
            console.error("Error tearing down Braintree instance:", error)
          );
      }
    };
  }, [show]);

  const handlePayment = () => {
    if (braintreeInstanceRef.current) {
      braintreeInstanceRef.current.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error("Error requesting payment method:", error);
        } else {
          const paymentMethodNonce = payload.nonce;
          console.log("Payment method nonce:", paymentMethodNonce);

          // Make the API call to the server to process the payment
          fetch("http://localhost:3002/api/payment/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethodNonce: paymentMethodNonce,
              amount: "10.00", // The amount to charge
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Payment response:", data);
              alert("Payment completed successfully!");
              onPaymentCompleted();
            })
            .catch((error) => {
              console.error("Payment error:", error);
              alert("Payment failed. Please try again.");
            });
        }
      });
    }
  };

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div ref={containerRef} />

      <Button
        className="braintreePayButton"
        color="primary"
        disabled={!braintreeReady}
        onClick={handlePayment}
      >
        Pay
      </Button>
    </div>
  );
}
