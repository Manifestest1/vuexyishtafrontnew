import axios from '../../utils/axios'

export const image_base_path = () => {
  return 'http://localhost:8000/'
}

export const getAuthUserData = () => {
  return axios.get('/user')
}

export const userRequestPasswordReset = email => {
  return axios.post('/request_password_reset', { email })
}

export const userPasswordReset = (token, newPassword) => {
  return axios.post('/request_password_reset', { token, newPassword }) 
}

export const userUpdateProfile = formData => {
  return axios.post('/user_profile_update', formData)
}

export const getAllFiltersData = () => {
  return axios.get('/get_filters_data')
}

export const fasescapImageUpload = formData => {
  return axios.post('/add_upload_images', formData)
}

// Credit api
export const getAllCredit = () => {
  return axios.get('/get_credits_data')
}

export const userCreditBalanceDedcut = batchsize => {
  return axios.post('/user_credit_balance_deduct', { batchsize })
}

// Razorpay api

export const razorpayCreateOreerApi = (amount, currency,receipt) => {
  return axios.post('/create-order', { amount, currency, receipt })
}


export const razorpayGeneratePaymentDetailApi = (order_payment_id,payment_id,payment,credit) => {
  return axios.post('/add_payment_detail', { order_payment_id,payment_id,payment,credit })
}
