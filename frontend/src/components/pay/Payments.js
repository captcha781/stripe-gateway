import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from 'react'
import Form from './Form'
import axios from 'axios';


const stripePromise = loadStripe('pk_test_51Lx3z7SHTl9j1RT5xXj8TcsgSeqLmKD0e336gTI69fIptEJfq7Cuss4cn6lPbYMzz5omX41q2OouY2lhJsIHwnTp00gjfBZt25')

const Payments = ({ depositAmount }) => {
    const [clientSecret, setClientSecret] = useState('')

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    const fetchClientSecret = async () => {
        const resp = await axios({
            url: '/getIntent',
            method: 'post',
            data: {deposit: depositAmount}
        })
        setClientSecret(resp.data.clientSecret)
    }

  return (
    <div>
        <button className='w-full py-1.5 bg-teal-500 rounded text-white' onClick={fetchClientSecret}>Deposit</button>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <Form clientSecret={clientSecret} />
            </Elements>
        )}
    </div>
  )
}

export default Payments