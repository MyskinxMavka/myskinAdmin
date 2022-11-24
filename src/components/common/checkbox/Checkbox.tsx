import {CustomCheckBox} from './styled'
import React from 'react'

interface CheckBoxProps {
    title?: string
    checked: boolean
    id: string
    setChecked: (active: boolean) => void
}

const Checkbox = ({title, setChecked, checked, id}: CheckBoxProps) => {
    
  return (
    <>
        <CustomCheckBox 
              id={`custom-checkbox ${id}`} 
              type="checkbox" 
              checked={checked} 
              name={title} 
              onChange={(e) => setChecked(e.target.checked)}
            />
        <label htmlFor={`custom-checkbox ${id}`} >{title}</label>
    </>
  )
}

export default Checkbox