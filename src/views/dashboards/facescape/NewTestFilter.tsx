'use client'

import { useState, useEffect } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'

import type { SelectChangeEvent } from '@mui/material/Select'

type FilterOption = {
  id: number
  name: string
  sub_categories: { id: string; sub_category: string; image: string }[]
}

type Props = {
  selectedFilterOptions: FilterOption[]
  setSelectedSubCategories: React.Dispatch<React.SetStateAction<string[][]>>
}

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander']

const NewTestFilter = ({ selectedFilterOptions, setSelectedSubCategories }: Props) => {
  // States
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  return (
    <>
      <Card style={{ marginTop: '40px', padding: '25px' }}>
        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
            <CustomTextField
              select
              fullWidth
              label='Activity'
              value={personName}
              id='demo-multiple-chip'
              SelectProps={{
                multiple: true,
                MenuProps,
                onChange: handleChange,
                renderValue: selected => (
                  <div className='flex flex-wrap gap-1'>
                    {(selected as unknown as string[]).map(value => (
                      <Chip key={value} label={value} size='small' />
                    ))}
                  </div>
                )
              }}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  <img
                    src='/images/avatars/4.png'
                    alt={`Character ${name}`}
                    style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }}
                  />
                  {name}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
        </div>
      </Card>
    </>
  )
}

export default NewTestFilter
