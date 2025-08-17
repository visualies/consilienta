'use client'

import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'

const ColorPicker: React.FC<TextFieldClientProps> = (props) => {
  const { path, label, required, admin } = props
  const { value, setValue } = useField<string>({ path })

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className="field-type text">
      <FieldLabel
        label={label}
        required={required}
      />
      
      {admin?.description && (
        <div className="field-description">
          {admin.description}
        </div>
      )}
      
      <div className="input-wrapper" style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
        {/* Visual color picker */}
        <input
          type="color"
          value={value || '#000000'}
          onChange={handleColorChange}
          className="field-input"
          style={{
            width: '42px',
            minWidth: '42px',
            height: 'auto',
            padding: '6px',
            border: '1px solid var(--theme-elevation-150)',
            borderRight: 'none',
            borderRadius: '3px 0 0 3px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        />
        
        {/* Text input for manual entry */}
        <input
          type="text"
          value={value || ''}
          onChange={handleTextChange}
          placeholder="#000000"
          className="field-input"
          style={{
            flex: 1,
            borderRadius: '0 3px 3px 0',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  )
}

export default ColorPicker