// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'

import type { SelectChangeEvent } from '@mui/material/Select'

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

const TestFilter = () => {
  // States
  const [personName, setPersonName] = useState<string[]>([])
  const [personName1, setPersonName1] = useState<string[]>([])
  const [personName2, setPersonName2] = useState<string[]>([])
  const [personName3, setPersonName3] = useState<string[]>([])
  const [selectOther, setOther] = useState<string[]>([])
  const [personNameNative, setPersonNameNative] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  const handleChange1 = (event: SelectChangeEvent<string[]>) => {
    setPersonName1(event.target.value as string[])
  }

  const handleChange2 = (event: SelectChangeEvent<string[]>) => {
    setPersonName2(event.target.value as string[])
  }

  const handleChange3 = (event: SelectChangeEvent<string[]>) => {
    setPersonName3(event.target.value as string[])
  }

  const handleChange4 = (event: SelectChangeEvent<string[]>) => {
    setOther(event.target.value as string[])
  }

  const handleChangeMultipleNative = (event: ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target
    const value: string[] = []

    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }

    setPersonNameNative(value)
  }

  return (
    <>
      <Card style={{ marginTop: '40px', padding: '25px' }}>
        <div className='flex gap-4 flex-col'>
          <div>
            <CustomTextField
              select
              fullWidth
              label='Location'
              value={personName} // Assuming personName is an object with 'name' and 'image' properties
              id='demo-multiple-chip'
              SelectProps={{
                multiple: true,
                MenuProps,
                onChange: handleChange,
                renderValue: selected => (
                  <div className='flex flex-wrap gap-1'>
                    {(selected as unknown as string[]).map(value => (
                      <Chip key={value.name} label={value.name} size='small' />
                    ))}
                  </div>
                )
              }}
            >
              {names.map(name => (
                <MenuItem key={name} value={{ name: name, image: `/images/avatars/${name}.png` }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src='/images/avatars/2.png'
                      alt={`Character ${name}`}
                      style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }}
                    />
                    {name}
                  </div>
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
        </div>

        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
            <CustomTextField
              select
              fullWidth
              label='Activity'
              value={personName1}
              id='demo-multiple-chip'
              SelectProps={{
                multiple: true,
                MenuProps,
                onChange: handleChange1,
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

        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
            <CustomTextField
              select
              fullWidth
              label='Select Item'
              value={personName2}
              id='demo-multiple-chip'
              SelectProps={{
                multiple: true,
                MenuProps,
                onChange: handleChange2,
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
                    src='/images/avatars/2.png'
                    alt={`Character ${name}`}
                    style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }}
                  />
                  {name}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
        </div>

        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
            <CustomTextField
              select
              fullWidth
              label='Select Item'
              value={personName3}
              id='demo-multiple-chip'
              SelectProps={{
                multiple: true,
                MenuProps,
                onChange: handleChange3,
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
                    src='/images/avatars/2.png'
                    alt={`Character ${name}`}
                    style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }}
                  />
                  {name}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
        </div>

        <div className='flex gap-4 flex-col' style={{ marginTop: '20px' }}>
          <div>
            <CustomTextField type='text' fullWidth label='Other' placeholder='Other' />
          </div>
        </div>
      </Card>
    </>
  )
}

export default TestFilter
