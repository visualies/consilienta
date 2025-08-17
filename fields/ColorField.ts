import { TextField } from 'payload'

interface ColorFieldArgs {
  name: string
  label?: string
  required?: boolean
  defaultValue?: string
  admin?: {
    description?: string
    placeholder?: string
  }
}

export const ColorField = (args: ColorFieldArgs): TextField => {
  const { name, label, required = false, defaultValue, admin } = args

  return {
    name,
    type: 'text',
    label: label || 'Color',
    required,
    defaultValue,
    admin: {
      ...admin,
      components: {
        Field: '@/components/ColorPicker',
      },
    },
  } as TextField
}