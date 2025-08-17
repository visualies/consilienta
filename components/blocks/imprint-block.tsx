"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface ImprintBlockProps {
  data?: {
    title?: string
    subtitle?: string
    companyInfo?: {
      companyName: string
      address: string
    }
    contactInfo?: {
      email: string
      phones: Array<{ phone: string }>
    }
    legalInfo?: {
      managingDirectors: string
      commercialRegister: string
      registerNumber?: string
      vatId?: string
    }
    responsiblePerson?: {
      name: string
      description: string
      address: string
    }
    disclaimers?: {
      contentLiability: string
      linkLiability: string
      copyright: string
    }
  }
}

export function ImprintBlock({ data }: ImprintBlockProps) {
  const title = data?.title || "Imprint"
  const subtitle = data?.subtitle || "Legal Information"

  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <FadeUpAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </FadeUpAnimation>

        <FadeUpAnimation delay={0.2}>
          <div className="frosted-glass p-8 lg:p-12 rounded-2xl border border-white/20 space-y-8">
            
            {data?.companyInfo && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-4">
                  Company Information
                </h2>
                <div className="text-white/90 leading-relaxed space-y-2">
                  <p><strong>{data.companyInfo.companyName}</strong></p>
                  <div className="whitespace-pre-line">{data.companyInfo.address}</div>
                </div>
              </div>
            )}

            {data?.contactInfo && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-4">
                  Contact
                </h2>
                <div className="text-white/90 leading-relaxed space-y-2">
                  <p><strong>Email:</strong> {data.contactInfo.email}</p>
                  {data.contactInfo.phones?.map((phoneObj, index) => (
                    <p key={index}><strong>Phone:</strong> {phoneObj.phone}</p>
                  ))}
                </div>
              </div>
            )}

            {data?.legalInfo && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-4">
                  Legal Information
                </h2>
                <div className="text-white/90 leading-relaxed space-y-2">
                  <p><strong>Managing Directors:</strong> {data.legalInfo.managingDirectors}</p>
                  <p><strong>Commercial Register:</strong> {data.legalInfo.commercialRegister}</p>
                  {data.legalInfo.registerNumber && (
                    <p><strong>Register Number:</strong> {data.legalInfo.registerNumber}</p>
                  )}
                  {data.legalInfo.vatId && (
                    <p><strong>VAT ID:</strong> {data.legalInfo.vatId}</p>
                  )}
                </div>
              </div>
            )}

            {data?.responsiblePerson && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-4">
                  Responsible for Content
                </h2>
                <div className="text-white/90 leading-relaxed space-y-2">
                  <p>{data.responsiblePerson.description}</p>
                  <p>{data.responsiblePerson.name}</p>
                  <div className="whitespace-pre-line">{data.responsiblePerson.address}</div>
                </div>
              </div>
            )}

            {data?.disclaimers && (
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-4">
                  Disclaimer
                </h2>
                <div className="text-white/90 leading-relaxed space-y-4">
                  <p>
                    <strong>Liability for Content:</strong> {data.disclaimers.contentLiability}
                  </p>
                  <p>
                    <strong>Liability for Links:</strong> {data.disclaimers.linkLiability}
                  </p>
                  <p>
                    <strong>Copyright:</strong> {data.disclaimers.copyright}
                  </p>
                </div>
              </div>
            )}

          </div>
        </FadeUpAnimation>
      </div>
    </section>
  )
}