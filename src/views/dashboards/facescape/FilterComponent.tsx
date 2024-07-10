import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import { Card, CardContent, Typography, MenuItem, FormControl, Select, Box, Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'

type FilterOption = {
  id: number
  name: string
  sub_categories: { id: string; sub_category: string; image: string }[]
}

type Props = {
  selectedFilterOptions: FilterOption[]
  setSelectedSubCategories: React.Dispatch<React.SetStateAction<string[][]>>
}

const FilterComponent = ({ selectedFilterOptions, setSelectedSubCategories }: Props) => {
  const theme = useTheme()
  const image_base_path = 'http://localhost:8000/'

  const [selectedSubCategories, setSelectedSubCategoriesLocal] = useState<string[][]>(
    selectedFilterOptions.map(() => [])
  )

  const handleChange = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
    const updatedSelectedSubCategories = [...selectedSubCategories]

    updatedSelectedSubCategories[index] = event.target.value as string[]
    setSelectedSubCategoriesLocal(updatedSelectedSubCategories)
    setSelectedSubCategories(updatedSelectedSubCategories) // Propagate changes using the prop setter
  }

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
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              <b>{selectFilter.name}</b>
            </Typography>

            <FormControl fullWidth>
              <InputLabel>..Select..</InputLabel>
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
                          src={image_base_path + selectFilter.sub_categories.find(sub => sub.id === value)?.image}
                          alt='Uploaded Preview'
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: '12px'
                          }}
                        />
                        <Typography variant='body2' sx={{ marginRight: '8px' }}>
                          {selectFilter.sub_categories.find(sub => sub.id === value)?.sub_category}
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
                <MenuItem disabled value='Select Category'>
                  Select Sub Category
                </MenuItem>
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
                        src={image_base_path + subCategory.image}
                        alt='Uploaded Preview'
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          marginRight: '12px'
                        }}
                      />
                      <Typography variant='body2' sx={{ marginRight: '8px' }}>
                        {subCategory.sub_category}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default FilterComponent
