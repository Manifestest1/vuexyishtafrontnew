import { useState } from 'react';
import Script from 'next/script';
import Button from '@mui/material/Button'
import { razorpayCreateOreerApi } from '@/context/api/apiService';

function RazorPayPayment() {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false); 

  const paymentHandler = (event) => {
    event.preventDefault();

    if (!isRazorpayLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }

    const amountInUSD = 500; // Amount in USD
    const amountInCents = amountInUSD * 100; // Convert to cents
    const currency = 'USD'; // Use USD for the currency
    const receiptId = '1234567890';

    // Call the API function
    razorpayCreateOreerApi(amountInCents, currency, receiptId)
      .then(order => {
        console.log('order', order);

        const options = {
          key: "", // Add your Razorpay key here
          amount: amountInCents, // Amount in the smallest unit (cents)
          currency,
          name: "Ishta",
          description: "Transaction",
          image: "https://i.ibb.co/5Y3m33n/test.png",
          order_id: order.data.id,
          handler: async function (response) {
            const body = { ...response };

            try {
              const validateResponse = await fetch('http://localhost:8000/api/order-validate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
              });

              const jsonResponse = await validateResponse.json();
              console.log('jsonResponse', jsonResponse);
            } catch (error) {
              console.error('Validation error:', error);
            }
          },
          prefill: {
            name: "Ishta",
            email: "webcoder@example.com",
            contact: "6261966919",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#7367F0",
          },
        };

        if (window.Razorpay) {
          var rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });

          rzp1.open();
        } else {
          console.error('Razorpay script not loaded');
        }
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setIsRazorpayLoaded(true)}
      />
      <div className='product'>
        <h1>Payment Gateway</h1>
        <Button variant='tonal' size='small' onClick={paymentHandler}>Pay Now</Button>
      </div>
    </>
  );
}

export default RazorPayPayment;
