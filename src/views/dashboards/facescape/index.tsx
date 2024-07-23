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
  const [filterSelectedSubCategories, setFilterSelectedSubCategories] = useState([])
  const [filterSelectedInputCategories, setFilterSelectedInputCategories] = useState(null)
  const [generateImages, setGenerateImages] = useState([])

  const handleChange = event => {
    setSelectedSubCategories(event.target.value) // event.target.value will be an array of selected values
  }

  const genrateApiFunction = async () => {
    console.log("batch size", batchSize);

    let textPrompt = '';

    // Check if filterSelectedInputCategories is not null and concatenate with filterSelectedSubCategories
    if (filterSelectedInputCategories !== null) {
        const combinedString = `${filterSelectedInputCategories}, ${filterSelectedSubCategories}`;
        console.log('Filter Data', combinedString);
        textPrompt = combinedString;
    } else {
        // Use filterSelectedSubCategories alone if filterSelectedInputCategories is null
        const combinedString = `${filterSelectedSubCategories}`;
        console.log('Filter Data', combinedString);
        textPrompt = combinedString;
    }

    try {
        const response = await fetch('https://api.gooey.ai/v3/FaceInpainting/async/', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer sk-07ztMzsF169B5xoh4Xn9MMhfUWQfPYz3J1I53P288wS6IZNQ',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input_image: 'https://i.imghippo.com/files/dv8ID1718827153.png',
                text_prompt: textPrompt, // Set text_prompt here
                num_outputs: batchSize
            })
        });

        if (!response.ok) 
        {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Apply Get Images Api
        setTimeout(() => {
            getGenerateImages(data.run_id);
        }, 25000);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

  const getGenerateImages = async run_id => {
    const runId = run_id // Replace with your actual run_id

    try {
      const response = await fetch(`https://api.gooey.ai/v3/FaceInpainting/status/?run_id=${runId}`, {
        headers: {
          Authorization: 'Bearer sk-07ztMzsF169B5xoh4Xn9MMhfUWQfPYz3J1I53P288wS6IZNQ',
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }

      const data = await response.json()

      console.log('API Response Generate Images:', data)

      setGenerateImages(data.output.output_images)

      // Process the API response as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
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
          setFilterSelectedSubCategories={setFilterSelectedSubCategories}
          setFilterSelectedInputCategories={setFilterSelectedInputCategories}
          filterSelectedInputCategories={filterSelectedInputCategories}
          handleChange={handleChange}
        />

        <div style={{ marginTop: '40px' }}>
          <Button onClick={genrateApiFunction} style={{ width: '100%' }} variant='contained'>
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

        <TimelineComponent generateImages={generateImages} />
      </Grid>
    </Grid>
  )
}

export default FaceScapeBasicComponent
