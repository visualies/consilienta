"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

interface FormBlockProps {
  data: {
    title?: string
    description?: string
    fields: Array<{
      type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'number'
      label: string
      placeholder?: string
      required: boolean
      options?: Array<{
        label: string
        value: string
      }>
    }>
    submitButton: {
      text: string
      variant: 'primary' | 'secondary' | 'cta'
    }
  }
}

export function FormBlock({ data }: FormBlockProps) {
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    // Handle success/error states
  }

  const renderField = (field: any, index: number) => {
    const fieldName = `field_${index}`
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={index} className="space-y-2">
            <label htmlFor={fieldName} className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
              id={fieldName}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[fieldName] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              className="w-full"
            />
          </div>
        )
      
      case 'textarea':
        return (
          <div key={index} className="space-y-2">
            <label htmlFor={fieldName} className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Textarea
              id={fieldName}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[fieldName] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>
        )
      
      case 'select':
        return (
          <div key={index} className="space-y-2">
            <label htmlFor={fieldName} className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Select
              value={formData[fieldName] || ''}
              onValueChange={(value) => handleInputChange(fieldName, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, optIndex) => (
                  <SelectItem key={optIndex} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      
      case 'checkbox':
        return (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={fieldName}
              checked={formData[fieldName] || false}
              onCheckedChange={(checked) => handleInputChange(fieldName, checked)}
              required={field.required}
            />
            <label htmlFor={fieldName} className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.section
      ref={formRef}
      className="px-6 py-16 bg-gray-50"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center space-y-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {data.title && (
            <h2 className="text-3xl font-serif font-medium text-gray-900">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-lg text-gray-600">
              {data.description}
            </p>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.fields.map((field, index) => renderField(field, index))}
          
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              type="submit"
              variant={data.submitButton.variant}
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : data.submitButton.text}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  )
}
