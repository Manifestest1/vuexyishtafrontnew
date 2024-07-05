'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Grid } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import type { TimelineProps } from '@mui/lab/Timeline'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const TimelineComponent = () => {
  return (
    <div className='mt-8'>
      <Timeline>
        {/* <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  12 Invoices have been paid
                </Typography>
                <Typography variant='caption'>12 min ago</Typography>
              </div>
              <Typography className='mbe-2'>Invoices have been paid to the company</Typography>
              <div className='flex items-center gap-2.5 is-fit rounded bg-actionHover plb-[5px] pli-2.5'>
                <img height={20} alt='invoice.pdf' src='/images/icons/pdf-document.png' />
                <Typography className='font-medium'>invoices.pdf</Typography>
              </div>
            </TimelineContent>
          </TimelineItem>
            <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  Create a new project for client
                </Typography>
                <Typography variant='caption'>2 Day Ago</Typography>
              </div>
              <Typography className='mbe-2'>6 team members in a project</Typography>
              <AvatarGroup total={6} className='pull-up'>
                <Avatar alt='Travis Howard' src='/images/avatars/1.png' />
                <Avatar alt='Agnes Walker' src='/images/avatars/4.png' />
                <Avatar alt='John Doe' src='/images/avatars/2.png' />
              </AvatarGroup>
            </TimelineContent>
          </TimelineItem> */}

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card>
              <CardContent className='flex flex-col gap-6 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Typography className='mbe-2'>10th January</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card>
              <CardContent className='flex flex-col gap-6 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Typography className='mbe-2'>12th January</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card>
              <CardContent className='flex flex-col gap-6 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Typography className='mbe-2'>13th January</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card>
              <CardContent className='flex flex-col gap-6 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Typography className='mbe-2'>10th January</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card>
              <CardContent className='flex flex-col gap-6 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                      <img src='/images/avatars/2.png' height={200} />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Typography className='mbe-2'>12th January</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}

export default TimelineComponent
