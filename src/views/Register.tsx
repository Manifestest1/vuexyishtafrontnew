'use client'

// React Imports
import { useState, useContext } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './pages/auth/AuthIllustrationWrapper'
import AuthContext from '@/context/AuthContext'
import { Email } from '../../node_modules_old/@mui/icons-material'

const Register = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  // Added Code Now

  const { register } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [error, setError] = useState()

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!name) {
      setError('Please enter first name.')

      return
    }

    if (!email) {
      setError('Please enter email.')

      return
    }

    if (!password) {
      setError('Please enter password.')

      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')

      return
    }

    setError('')
    await register(name, email, password, passwordConfirmation)
  }

  return (
    <Grid container spacing={80}>
      <Grid item xs={12} md={4}></Grid>

      <Grid item xs={12} md={4} sx={{ mt: 36, alignItems: 'center' }}>
        <AuthIllustrationWrapper>
          <Card className='flex flex-col sm:is-[450px]'>
            <CardContent className='sm:!p-12'>
              <div className='flex justify-center mbe-6'>
                <Logo />
              </div>
              <div className='flex flex-col gap-1 mbe-6'>
                <Typography variant='h4'>Adventure starts here 🚀</Typography>
                <Typography>Make your app management easy and fun!</Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='First Name'
                  placeholder='Enter your first name'
                  onChange={e => setName(e.target.value)}
                />
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='Last Name'
                  placeholder='Enter your last name'
                  onChange={e => setName(e.target.value)}
                />
                <CustomTextField
                  fullWidth
                  label='Email'
                  placeholder='Enter your email'
                  onChange={e => setEmail(e.target.value)}
                />
                <CustomTextField
                  fullWidth
                  label='Password'
                  placeholder='············'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {error && <span className='input-error'>{error}</span>}
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <>
                      <span>I agree to </span>
                      <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                        privacy policy & terms
                      </Link>
                    </>
                  }
                />
                <Button fullWidth variant='contained' type='submit'>
                  Sign Up
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>Already have an account?</Typography>
                  <Typography component={Link} href={getLocalizedUrl('/login', locale as Locale)} color='primary'>
                    Sign in instead
                  </Typography>
                </div>
                <Divider className='gap-2 text-textPrimary'>or</Divider>
                <div className='flex justify-center items-center gap-1.5'>
                  <IconButton className='text-facebook' size='small'>
                    <i className='tabler-brand-facebook-filled' />
                  </IconButton>
                  <IconButton className='text-twitter' size='small'>
                    <i className='tabler-brand-twitter-filled' />
                  </IconButton>
                  <IconButton className='text-textPrimary' size='small'>
                    <i className='tabler-brand-github-filled' />
                  </IconButton>
                  <IconButton className='text-error' size='small'>
                    <i className='tabler-brand-google-filled' />
                  </IconButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </AuthIllustrationWrapper>
      </Grid>
    </Grid>
  )
}

export default Register
