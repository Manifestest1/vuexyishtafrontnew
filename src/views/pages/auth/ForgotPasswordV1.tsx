'use client'

import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

import { userRequestPasswordReset } from '@/context/api/apiService'

const ForgotPasswordV1 = () => {
  // Hooks
  const { lang: locale } = useParams()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    userRequestPasswordReset(email)
      .then(response => {
        console.log(response, 'Link Update Successfully')
        setMessage('User Link Send Successfully')
      })
      .catch(error => {
        if (error.response.status === 401)
        {
          // Handle unauthorized access
        }
      })
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Forgot Password 🔒</Typography>
            <Typography>Enter your email and we&#39;ll send you instructions to reset your password</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Email'
              placeholder='Enter your email'
              onChange={e => setEmail(e.target.value)}
            />
            <Button fullWidth variant='contained' type='submit'>
              Send Reset Link
            </Button>
            <Typography className='flex justify-center items-center' color='primary'>
              <Link
                href={getLocalizedUrl('pages/auth/login-v1', locale as Locale)}
                className='flex items-center gap-1.5'
              >
                <DirectionalIcon
                  ltrIconClass='tabler-chevron-left'
                  rtlIconClass='tabler-chevron-right'
                  className='text-xl'
                />
                <span>Back to login</span>
              </Link>
            </Typography>
          </form>
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default ForgotPasswordV1
