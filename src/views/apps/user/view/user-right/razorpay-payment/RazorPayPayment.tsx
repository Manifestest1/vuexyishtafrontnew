import { useState } from 'react';
import Script from 'next/script';
import Button from '@mui/material/Button';
import { razorpayCreateOreerApi, razorpayGeneratePaymentDetailApi } from '@/context/api/apiService';

function RazorPayPayment({ selectedCreditValue,updateuserData }) {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  const paymentHandler = (event) => {
    event.preventDefault();
    const getamountInUSD = selectedCreditValue.value;
    const getamountCredit = selectedCreditValue.credit;
  
    if (!isRazorpayLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }
  
    const amountInUSD = getamountInUSD; // Amount in USD
    const amountInCents = amountInUSD * 100; // Convert to cents
    const currency = 'USD'; // Use USD for the currency
    const receiptId = '1234567890';
  
    // Call the API function to create an order
    razorpayCreateOreerApi(amountInCents, currency, receiptId)
      .then(order => {
        console.log('order', order);
  
        // Razorpay Payment options
        // const options = {
        //   key: "", // Add your Razorpay key here
        //   amount: amountInCents, // Amount in the smallest unit (cents)
        //   currency,
        //   name: "Ishta",
        //   description: "Transaction",
        //   image: "https://i.ibb.co/5Y3m33n/test.png",
        //   order_id: order.data.id,
        //   handler: async function (response) {
        //     const body = { ...response };
  
        //     try {
        //       // Validate the payment on your server
        //       const validateResponse = await fetch('http://localhost:8000/api/order-validate', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(body),
        //       });
  
        //       const jsonResponse = await validateResponse.json();
        //       console.log('jsonResponse', jsonResponse);
  
        //       // Call API to save payment details after order creation
        //       razorpayGeneratePaymentDetailApi(order.data.id,jsonResponse.paymentId,getamountInUSD, getamountCredit)
        //         .then(res => {
        //           console.log('Payment details saved:', res);
        //           updateuserData(res.data.user_credit_balance);
        //           // Handle success if needed
        //         })
        //         .catch(error => {
        //           console.error('Error saving payment details:', error);
        //           // Handle error if needed
        //         });
  
        //     } catch (error) {
        //       console.error('Validation error:', error);
        //     }
        //   },
        //   prefill: {
        //     name: "Ishta",
        //     email: "webcoder@example.com",
        //     contact: "6261966919",
        //   },
        //   notes: {
        //     address: "Razorpay Corporate Office",
        //   },
        //   theme: {
        //     color: "#7367F0",
        //   },
        // };

        const options = {
          key: "", // Replace with your Razorpay key
          amount: amountInCents,
          currency: currency,
          name: "Ishta",
          description: "Transaction",
          image: "https://i.ibb.co/5Y3m33n/test.png",
          order_id: order.data.id,
          handler: async function (response) {
            // Handler function remains the same
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
          payment: {
            display: {
              card: true,  // Enable credit/debit cards
              netbanking: true,  // Enable netbanking
              wallet: true,  // Enable wallets
              upi: true,  // Enable UPI
            },
          },
        };
        
  
        // Initialize Razorpay checkout
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
      <Button variant='contained' onClick={paymentHandler}>Buy Now</Button>
    </>
  );
}

export default RazorPayPayment;
