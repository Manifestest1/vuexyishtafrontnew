'use client'

import { Card, CardContent, Typography, MenuItem, FormControl,  Select } from '@mui/material';

type Props = {
  selectedFilterOptions: string
  selectedSubCategories: string

  handleChange: () => void
}


const FilterComponent = ({selectedFilterOptions,selectedSubCategories,handleChange}: Props) => {
  const image_base_path = 'http://localhost:8000/';

  return(
    <Card className='mt-8'>

     <CardContent>
      {selectedFilterOptions && selectedFilterOptions.map(selectFilter => (
        <div key={selectFilter.id}> {/* Make sure to include a unique key for each mapped item */}
          <Typography variant='body2' sx={{ fontWeight: 600 }}>Select <b>{selectFilter.name}</b></Typography>
          <FormControl fullWidth>
            <Select
              label="Status"
              multiple // Enable multiple selection
              value={selectedSubCategories} // Array of selected values
              onChange={handleChange}
              defaultValue="Select Category"
            >
              <MenuItem disabled value="Select Category">Select Sub Category</MenuItem>
              {selectFilter.sub_categories.map((subCategory, index) => (

                //  <MenuItem key={index} value={subCategory.id} sx={{ backgroundColor: '#2f3349' }}> {/* Set background color */}
                <MenuItem key={index} value={subCategory.id} sx={{ backgroundColor: '#2f3349' }}> {/* Set background color */}
                  <span style={{ alignItems: 'center',backgroundColor: '#2f3349',padding: '5px',borderRadius: '5px'}}> {/* Center align */}
                    <img
                      src={image_base_path + subCategory.image}
                      alt="Uploaded Preview"
                      width={16}
                      height={16}
                      style={{ borderRadius: '50%', marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '18px' }}>{subCategory.sub_category}</span>
                  </span>
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
