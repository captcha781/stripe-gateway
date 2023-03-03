import React, { useCallback, useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const Form = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [id, setId] = useState("");

  const confirmPayment = useCallback(async () => {
    let resp = await axios.post("/confirmPayment", {
      clientSecret: id,
    });
    if(resp.data.success) {
      console.log("Payment Successful");
      toast.success(resp.data.message);
    } else {
      console.log("Payment Unsuccessful");
      toast.error(resp.data.message);
    }
  }, [id]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            
            await confirmPayment();
            break;
          case "processing":
            toast.info('Processing your payment')
            break;
          case "requires_payment_method":
            // toast.warn('Requires a payment method')
            break;
          default:
            
            break;
        }
      });
  }, [stripe, id, clientSecret, confirmPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const resp = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
      redirect: "if_required",
    });
    console.log("Point reach");
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      resp.error &&
      (resp.error.type === "card_error" ||
        resp.error.type === "validation_error")
    ) {
      toast.error(resp.error.message);
    }
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }
    setId(resp.paymentIntent.id);
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
    paymentMethodOrder: ["card"],
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-teal-500 px-3 py-1.5 mt-3 rounded-md text-white mb-3"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      
      
    </form>
  );
};

export default Form;
