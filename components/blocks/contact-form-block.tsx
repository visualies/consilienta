"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

interface ContactFormBlockProps {
  title?: string
  subtitle?: string
  description?: string
  contactInfo?: {
    email?: string
    phones?: Array<{
      label: string
      number: string
    }>
    address?: string
  }
  formFields?: Array<{
    id?: string
    name: string
    type: string
    label: string
    required?: boolean
    placeholder?: string
    options?: Array<{ label: string; value: string }>
  }>
  submitText?: string
  successMessage?: string
}

export function ContactFormBlock({ 
  title,
  subtitle,
  description,
  contactInfo,
  formFields,
  submitText,
  successMessage
}: ContactFormBlockProps) {
  console.log('ContactFormBlock rendered with props:', { title, subtitle, description, contactInfo, formFields })
  
  // Use provided data or minimal fallbacks
  const displayTitle = title || "Get in Touch"
  const displaySubtitle = subtitle || ""
  const displayDescription = description || ""
  const displaySubmitText = submitText || "Send Message"
  const displaySuccessMessage = successMessage || "Thank you for your message!"
  
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [lastSubmittedData, setLastSubmittedData] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string, field: any): string => {
    // Skip validation for service field
    if (name === 'service') {
      return ''
    }
    
    if (field.required && (!value || value.trim() === '')) {
      return 'required'
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'invalid email'
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'invalid phone'
      }
    }

    if (name === 'firstName' || name === 'lastName') {
      if (value && value.length < 2) {
        return 'min. 2 characters'
      }
      if (value && !/^[a-zA-Z\s\-'\.]+$/.test(value)) {
        return 'letters only'
      }
    }

    if (name === 'message' && value && value.length < 10) {
      return 'min. 10 characters'
    }

    return ''
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    formFields?.forEach(field => {
      const value = formData[field.name] || ''
      const error = validateField(field.name, value, field)
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Force validation of all fields to show all errors at once
    const newErrors: Record<string, string> = {}
    
    formFields?.forEach(field => {
      const value = formData[field.name] || ''
      const error = validateField(field.name, value, field)
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      console.log('Form submitted successfully:', result)
      
      // Save submitted data (excluding message for new form)
      const dataToSave = { ...formData }
      delete dataToSave.message // Clear message but keep personal info
      setLastSubmittedData(dataToSave)
      
      setIsSubmitted(true)
      setFormData({})
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
      // Could add error handling here if needed
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (name: string) => {
    const field = formFields?.find(f => f.name === name)
    if (field) {
      const value = formData[name] || ''
      const error = validateField(name, value, field)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-medium text-white mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {displaySuccessMessage}
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setFormData(lastSubmittedData) // Restore previous data
              }}
              variant="cta"
              size="lg"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        
        
        {/* Header */}
        <div className="text-center mb-12">
          {displaySubtitle && (
            <p className="text-lg text-white/70 mb-2 font-medium">
              {displaySubtitle}
            </p>
          )}
          <h2 className="text-4xl font-serif font-medium text-white mb-4">
            {displayTitle}
          </h2>
          {displayDescription && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {displayDescription}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="frosted-glass-navbar rounded-lg p-8 h-fit">
              <h3 className="text-2xl font-serif font-medium text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo?.email && (
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm font-medium">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-blue-300 transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo?.phones && contactInfo.phones.length > 0 && (
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm font-medium">Phone</p>
                      <div className="space-y-1">
                        {contactInfo.phones.map((phone, index) => (
                          <a key={index} href={`tel:${phone.number}`} className="text-white hover:text-blue-300 transition-colors block">
                            {phone.number}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                                 {contactInfo?.address && (
                   <div className="flex items-start space-x-4">
                     <MapPin className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                     <div>
                       <p className="text-white/70 text-sm font-medium">Address</p>
                       <div className="text-white whitespace-pre-line">
                         {contactInfo.address}
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

                     {/* Contact Form */}
           <div className="lg:col-span-2">
             <div className="frosted-glass-navbar rounded-lg p-8">
               <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                 <div className="grid md:grid-cols-2 gap-6">
                   {formFields?.map((field) => {
                     if (field.type === "select") {
                       return (
                         <div key={field.id || field.name} className={field.name === "message" ? "md:col-span-2" : ""}>
                           <label className="block text-white mb-2 font-medium">
                             {field.label}
                             {field.required && field.name !== 'service' && <span className="text-red-400 ml-1">*</span>}
                             {errors[field.name] && <span className="text-red-400 ml-2 text-sm">{errors[field.name]}</span>}
                           </label>
                           <Select
                             value={formData[field.name] || ""}
                             onValueChange={(value) => {
                               handleChange(field.name, value)
                               handleBlur(field.name) // Validate immediately on selection
                             }}
                             required={field.required}
                           >
                             <SelectTrigger className={`bg-white/10 text-white ${errors[field.name] ? 'border-red-400/60 bg-red-500/5' : 'border-white/20'}`}>
                               <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                             </SelectTrigger>
                             <SelectContent className="bg-gray-800 border-white/20">
                               {field.options?.map((option) => (
                                 <SelectItem key={option.value} value={option.value} className="text-white">
                                   {option.label}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                       )
                     }
                     
                     if (field.type === "textarea") {
                       return (
                         <div key={field.id || field.name} className="md:col-span-2">
                           <label className="block text-white mb-2 font-medium">
                             {field.label}
                             {field.required && field.name !== 'service' && <span className="text-red-400 ml-1">*</span>}
                             {errors[field.name] && <span className="text-red-400 ml-2 text-sm">{errors[field.name]}</span>}
                           </label>
                           <Textarea
                             value={formData[field.name] || ""}
                             onChange={(e) => handleChange(field.name, e.target.value)}
                             onBlur={() => handleBlur(field.name)}
                             required={field.required}
                             placeholder={field.placeholder}
                             className={`text-white placeholder:text-white/50 min-h-[120px] ${errors[field.name] ? 'border-red-400/60 bg-red-500/5' : 'bg-white/10 border-white/20'}`}
                           />
                         </div>
                       )
                     }
                     
                     return (
                       <div key={field.id || field.name}>
                         <label className="block text-white mb-2 font-medium">
                           {field.label}
                           {field.required && field.name !== 'service' && <span className="text-red-400 ml-1">*</span>}
                           {errors[field.name] && <span className="text-red-400 ml-2 text-sm">{errors[field.name]}</span>}
                         </label>
                         <Input
                           type={field.type}
                           value={formData[field.name] || ""}
                           onChange={(e) => handleChange(field.name, e.target.value)}
                           onBlur={() => handleBlur(field.name)}
                           required={field.required}
                           placeholder={field.placeholder}
                           className={`text-white placeholder:text-white/50 ${errors[field.name] ? 'border-red-400/60 bg-red-500/5' : 'bg-white/10 border-white/20'}`}
                         />
                       </div>
                     )
                   })}
                 </div>
                
                
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="cta" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>{displaySubmitText}</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}