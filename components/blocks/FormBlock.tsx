"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface FormBlockProps {
  title?: string
  description?: string
  fields?: Array<{
    name: string
    type: string
    label: string
    required?: boolean
  }>
  submitText?: string
}

export function FormBlock({ 
  title = "Contact Us", 
  description = "Get in touch with our team",
  fields = [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "message", type: "textarea", label: "Message", required: true }
  ],
  submitText = "Send Message"
}: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {title && (
          <h2 className="text-3xl font-serif font-medium text-white mb-4 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-xl text-white/90 mb-8 text-center">
            {description}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-white mb-2">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {field.type === "textarea" ? (
                <Textarea
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              ) : (
                <Input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              )}
            </div>
          ))}
          
          <Button type="submit" size="lg" variant="cta" className="w-full">
            {submitText}
          </Button>
        </form>
      </div>
    </section>
  )
}