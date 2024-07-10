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

import { useForm, Controller } from 'react-hook-form'

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

type FormValues = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  // Added Code Now

  const { register } = useContext(AuthContext)

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data.name, data.email, data.password)
    } catch (error) {
      setErrorMessage('This email already exit. Please try again.')
      console.error(error)
    }
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

              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <Controller
                  name='name'
                  control={control}
                  rules={{
                    required: 'This field is required.'
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Name'
                      placeholder='Enter your name'
                      error={!!errors.email}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
                <Controller
                  name='email'
                  control={control}
                  rules={{
                    required: 'This field is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Please enter a valid email address.'
                    }
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Email'
                      placeholder='Enter your email'
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
                {errorMessage && (
                  <Typography color='error' className='mbe-6'>
                    {errorMessage}
                  </Typography>
                )}
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: 'This field is required.' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Password'
                      id='outlined-password'
                      placeholder='············'
                      type={isPasswordShown ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />

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
