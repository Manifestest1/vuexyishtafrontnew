'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import RazorPayPayment from '@/views/apps/user/view/user-right/razorpay-payment/RazorPayPayment'

import { razorpayCreateOreerApi } from '@/context/api/apiService';
import Script from 'next/script';

// Style Imports
import ConfirmationDialog from '../confirmation-dialog'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../DialogCloseButton'

type UpgradePlanProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const UpgradePlan = ({ open, setOpen }: UpgradePlanProps) => {
  // States
  const [openConfirmation, setOpenConfirmation] = useState(false)

  const [selectedPlan, setSelectedPlan] = useState('0'); 
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);  

  const handleChange = (event) => {
    console.log("Get Value",event.target.value);
    setSelectedPlan(event.target.value); // Update the selected plan when the selection changes
  };

  const handleClose = () => {
    setOpen(false)
  }

  const paymentHandler = (event) => {
    event.preventDefault();
    setOpen(false)
    if (!isRazorpayLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }

    const amountInUSD = selectedPlan; // Amount in USD
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
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          Upgrade Plan
          <Typography component='span' className='flex flex-col text-center'>
            Choose the best plan for user
          </Typography>
        </DialogTitle>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16 sm:pbe-16'>
          <div className='flex items-end gap-4 flex-col sm:flex-row'>
          <CustomTextField
          select
          fullWidth
          label='Choose Plan'
          defaultValue='Standard'
          id='user-view-plans-select'
          value={selectedPlan}
          onChange={handleChange}
        >
          <MenuItem value='0'>Basic - $0/month</MenuItem>
          <MenuItem value='99'>Standard - $99/month</MenuItem>
          <MenuItem value='499'>Enterprise - $499/month</MenuItem>
          <MenuItem value='999'>Company - $999/month</MenuItem>
        </CustomTextField>
        <Button
          variant='contained'
          className='capitalize sm:is-auto is-full'
          onClick={paymentHandler}
        > Upgrade
         </Button>
          </div>
          <Divider className='mlb-6' />
          <div className='flex flex-col gap-1'>
            <Typography variant='body2'>User current plan is standard plan</Typography>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex justify-center items-baseline gap-1'>
                <Typography component='sup' className='self-start mbs-3' color='primary'>
                  $
                </Typography>
                <Typography component='span' color='primary' variant='h1'>
                  99
                </Typography>
                <Typography variant='body2' component='sub' className='self-baseline'>
                  /month
                </Typography>
              </div>
              <Button variant='tonal' className='capitalize' color='error' onClick={() => setOpenConfirmation(true)}>
                Cancel Subscription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog open={openConfirmation} setOpen={setOpenConfirmation} type='unsubscribe' />
    </>
  )
}

export default UpgradePlan
