'use client'

// ** MUI Imports
import { useState, useEffect } from 'react'

import { Grid } from '@mui/material'

import Button from '@mui/material/Button'

import FilterComponent from './FilterComponent'

import ImageFilterComponent from './ImageFilterComponent'

// import DragDropImage from './DragDropImage';
import MediaCard from './MediaCard'

import { getAllFiltersData } from '../../../context/api/apiService'
import TimelineComponent from './TimelineComponent'

const FaceScapeBasicComponent = () => {
  const [quality, setQuality] = useState('low')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [batchSize, setBatchSize] = useState(1)

  // Filter Field Defined

  const [selectedFilterOptions, setFilterOptions] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])

  const handleChange = event => {
    setSelectedSubCategories(event.target.value) // event.target.value will be an array of selected values
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      getAllFiltersData()
        .then(response => {
          console.log(response.data.filters, 'Get All Filters')
          setFilterOptions(response.data.filters)
        })
        .catch(error => {
          if (error.response.status === 401) {
            // Handle unauthorized access
          }
        })
    }
  }, [])

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={4}>
        <MediaCard></MediaCard>

        <FilterComponent
          selectedFilterOptions={selectedFilterOptions}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          handleChange={handleChange}
        />

        <div style={{ marginTop: '40px' }}>
          <Button style={{ width: '100%' }} variant='contained'>
            Generate
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} md={8}>
        <ImageFilterComponent
          quality={quality}
          setQuality={setQuality}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          batchSize={batchSize}
          setBatchSize={setBatchSize}
        ></ImageFilterComponent>

        <TimelineComponent />
      </Grid>
    </Grid>
  )
}

export default FaceScapeBasicComponent
