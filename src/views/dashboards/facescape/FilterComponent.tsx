import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import { Card, CardContent, Typography, MenuItem, FormControl, Select, Box, Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'

import CustomTextField from '@core/components/mui/TextField'
import { image_base_path } from '@/context/api/apiService'

type FilterOption = {
  id: number
  name: string
  sub_categories: { id: string; filter: string; image: string }[]  
}

type Props = {
  selectedFilterOptions: FilterOption[]
  setSelectedSubCategories: React.Dispatch<React.SetStateAction<string[][]>>
  setFilterSelectedSubCategories: any
  setFilterSelectedInputCategories: any
  filterSelectedInputCategories: any
}

const FilterComponent = ({
  selectedFilterOptions,
  setSelectedSubCategories,
  setFilterSelectedSubCategories,
  setFilterSelectedInputCategories,
  filterSelectedInputCategories
}: Props) => {
  const theme = useTheme()

  const [selectedSubCategories, setSelectedSubCategoriesLocal] = useState<string[][]>(
    selectedFilterOptions.map(() => [])
  )

  const handleChange = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedIds = event.target.value as string[] // Assuming selected IDs are strings

    // Update state with the selected IDs
    const updatedSelectedSubCategories = [...selectedSubCategories]

    updatedSelectedSubCategories[index] = selectedIds

    // Initialize array to hold selected labels
    const selectedLabels: string[] = []

    // Iterate through updatedSelectedSubCategories to gather selected labels

    // updatedSelectedSubCategories.forEach((ids, idx) => {
    //   ids.forEach(id => {
    //     const subCategory = selectedFilterOptions[idx].sub_categories.find(sub => sub.id === id);
    
    //     if (subCategory) {
    //       selectedLabels.push(subCategory.api_key);
    //     }
    //   });
    // });

    async function processData() 
    {
      for (let idx = 0; idx < updatedSelectedSubCategories.length; idx++) {
        const ids = updatedSelectedSubCategories[idx];
    
        // Check if ids is an array before iterating
        if (Array.isArray(ids)) {
          for (const id of ids) {
            const subCategory = selectedFilterOptions[idx].sub_categories.find(sub => sub.id === id);
    
            if (subCategory) {
              selectedLabels.push(subCategory.api_key); 
            }
          }
        }
      }
    }
    
    // Call the async function
    processData()
      .then(() => {
        console.log("Data processing completed successfully");
        // Any further operations after data processing completes
      })
      .catch(error => {
        console.error("Error processing data:", error);
      });
    
      // Join all selected labels with comma and space
    const allSelectedText = selectedLabels.join(', ')
    
    console.log('Selected Items:', allSelectedText)

    // Update state or propagate changes as needed
    setFilterSelectedSubCategories(allSelectedText)
    setSelectedSubCategoriesLocal(updatedSelectedSubCategories)
    setSelectedSubCategories(updatedSelectedSubCategories) // Propagate changes using the prop setter
  }

  const handleInputChange = (newValue) => {
    // Update parent state directly
    setFilterSelectedInputCategories(newValue);
};

  useEffect(() => {
    // Update logic for dependent fields here
    if (selectedSubCategories[0] && selectedSubCategories[0].length > 0) {
      const updatedSelectedSubCategories = [...selectedSubCategories]

      updatedSelectedSubCategories[1] = selectedSubCategories[0] // Copy selection from the first field to the second field
      setSelectedSubCategoriesLocal(updatedSelectedSubCategories)
      setSelectedSubCategories(updatedSelectedSubCategories) // Propagate changes using the prop setter
    }
  }, [])

  return (
    <Card className='mt-8'>
      <CardContent>
        {selectedFilterOptions.map((selectFilter, index) => (
          <div key={selectFilter.id} style={{ marginBottom: '20px' }}>
            <Typography variant='body2' sx={{ fontWeight: 600,marginBottom: '4px' }}>
              <b>{selectFilter.name}</b>
            </Typography>

            <FormControl fullWidth>
              <InputLabel sx={{marginTop:'-2px',fontSize:'12px'}}>--Select--</InputLabel>
              <Select
                label='Status'
                multiple
                value={selectedSubCategories[index] || []}
                onChange={handleChange(index)}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map(value => (
                      <Box
                        key={value}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          borderRadius: '5px',
                          padding: '5px',
                          cursor: 'pointer',
                          backgroundColor: theme.palette.action.hover,
                          marginRight: '5px',
                          maxWidth: 'calc(100% - 10px)' // Adjust based on padding and margin
                        }}
                      >
                        <Avatar
                          src={image_base_path() + selectFilter.sub_categories.find(sub => sub.id === value)?.image}
                          alt='Uploaded Preview'
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: '12px'
                          }}
                        />
                        <Typography variant='body2' sx={{ marginRight: '8px' }}>
                          {selectFilter.sub_categories.find(sub => sub.id === value)?.filter}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 'auto' // Adjust the max height as needed
                    }
                  }
                }}
              >
                {selectFilter.sub_categories.map((subCategory, subIndex) => (
                  <MenuItem key={subIndex} value={subCategory.id}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: '5px',
                        padding: '5px',
                        cursor: 'pointer',
                        backgroundColor: theme.palette.action.hover,
                        marginRight: '5px',
                        maxWidth: 'calc(100% - 10px)' // Adjust based on padding and margin
                      }}
                    >
                      <Avatar
                        src={image_base_path() + subCategory.image}
                        alt='Uploaded Preview'
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          marginRight: '12px'
                        }}
                      />
                      <Typography variant='body2' sx={{ marginRight: '8px' }}>
                        {subCategory.filter}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
          <CustomTextField
                type='text'
                fullWidth
                label='Other'
                placeholder='Other'
                value={filterSelectedInputCategories || ''} // Handle null case if necessary
                onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterComponent
