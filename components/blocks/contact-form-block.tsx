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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      setIsSubmitted(true)
      setFormData({})
    } catch (error) {
      console.error('Error submitting form:', error)
      // You could add error state handling here
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
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
              onClick={() => setIsSubmitted(false)}
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-fit">
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
                                 {contactInfo?.phones && contactInfo.phones.map((phone, index) => (
                   <div key={index} className="flex items-start space-x-4">
                     <Phone className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                     <div>
                       <p className="text-white/70 text-sm font-medium">{phone.label}</p>
                       <a href={`tel:${phone.number}`} className="text-white hover:text-blue-300 transition-colors">
                         {phone.number}
                       </a>
                     </div>
                   </div>
                 ))}
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
             <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                   {formFields?.map((field) => {
                     if (field.type === "select") {
                       return (
                         <div key={field.id || field.name} className={field.name === "message" ? "md:col-span-2" : ""}>
                           <label className="block text-white mb-2 font-medium">
                             {field.label}
                             {field.required && <span className="text-red-400 ml-1">*</span>}
                           </label>
                           <Select
                             value={formData[field.name] || ""}
                             onValueChange={(value) => handleChange(field.name, value)}
                             required={field.required}
                           >
                             <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                             {field.required && <span className="text-red-400 ml-1">*</span>}
                           </label>
                           <Textarea
                             value={formData[field.name] || ""}
                             onChange={(e) => handleChange(field.name, e.target.value)}
                             required={field.required}
                             placeholder={field.placeholder}
                             className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                           />
                         </div>
                       )
                     }
                     
                     return (
                       <div key={field.id || field.name}>
                         <label className="block text-white mb-2 font-medium">
                           {field.label}
                           {field.required && <span className="text-red-400 ml-1">*</span>}
                         </label>
                         <Input
                           type={field.type}
                           value={formData[field.name] || ""}
                           onChange={(e) => handleChange(field.name, e.target.value)}
                           required={field.required}
                           placeholder={field.placeholder}
                           className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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