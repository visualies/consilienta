"use client"

import { FadeUpAnimation } from "@/components/ui/motion-wrappers"

interface LegalNoticeBlockProps {
  data?: {
    pageTitle?: string
    pageSubtitle?: string
    title?: string
    subtitle?: string
    disclaimer?: string
    companyInfo?: {
      companyName: string
      address: string
    }
    contactInfo?: {
      contactLabel: string
      phoneLabel: string
      emailLabel: string
      phone?: string
      email: string
    }
    managingDirectors?: {
      label: string
      directors: string
    }
    registrationInfo?: {
      registerLabel: string
      commercialRegisterLabel: string
      registrationNumberLabel: string
      commercialRegister: string
      registerNumber: string
    }
    vatInfo?: {
      vatLabel: string
      vatDescription: string
      vatId: string
    }
    responsiblePerson?: {
      label: string
      name: string
      companyName: string
      address: string
    }
    disclaimers?: {
      disclaimerTitle: string
      contentLiabilityLabel: string
      contentLiability: string
      linkLiabilityLabel: string
      linkLiability: string
      copyrightLabel: string
      copyright: string
    }
    additionalSections?: Array<{
      title: string
      content: string
    }>
  }
}

// Content rendering component for reuse in single/dual layouts
function LegalNoticeContent({ data }: { data: LegalNoticeBlockProps['data'] }) {
  return (
    <div className="space-y-8">
      {/* Company Information */}
      {data?.companyInfo && (
        <div>
          <div className="text-white/90 leading-relaxed space-y-2">
            <p className="font-semibold text-white">{data.companyInfo.companyName}</p>
            <div className="whitespace-pre-line">{data.companyInfo.address}</div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      {data?.contactInfo && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            {data.contactInfo.contactLabel}
          </h4>
          <div className="text-white/90 leading-relaxed space-y-1">
            {data.contactInfo.phone && (
              <p><strong>{data.contactInfo.phoneLabel}:</strong> {data.contactInfo.phone}</p>
            )}
            <p><strong>{data.contactInfo.emailLabel}:</strong> {data.contactInfo.email}</p>
          </div>
        </div>
      )}

      {/* Managing Directors */}
      {data?.managingDirectors && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            {data.managingDirectors.label}
          </h4>
          <div className="text-white/90 leading-relaxed whitespace-pre-line">
            {data.managingDirectors.directors}
          </div>
        </div>
      )}

      {/* Registration Information */}
      {data?.registrationInfo && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            {data.registrationInfo.registerLabel}
          </h4>
          <div className="text-white/90 leading-relaxed space-y-1">
            <p><strong>{data.registrationInfo.commercialRegisterLabel}:</strong> {data.registrationInfo.commercialRegister}</p>
            <p><strong>{data.registrationInfo.registrationNumberLabel}:</strong> {data.registrationInfo.registerNumber}</p>
          </div>
        </div>
      )}

      {/* VAT Information */}
      {data?.vatInfo && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            {data.vatInfo.vatLabel}
          </h4>
          <div className="text-white/90 leading-relaxed space-y-1">
            <p>{data.vatInfo.vatDescription}: {data.vatInfo.vatId}</p>
          </div>
        </div>
      )}

      {/* Responsible Person */}
      {data?.responsiblePerson && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            {data.responsiblePerson.label}
          </h4>
          <div className="text-white/90 leading-relaxed space-y-1">
            <p className="font-semibold text-white">{data.responsiblePerson.name}</p>
            <p>{data.responsiblePerson.companyName}</p>
            <div className="whitespace-pre-line">{data.responsiblePerson.address}</div>
          </div>
        </div>
      )}

      {/* Disclaimers */}
      {data?.disclaimers && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            {data.disclaimers.disclaimerTitle}
          </h4>
          <div className="text-white/90 leading-relaxed space-y-4">
            <div>
              <h5 className="font-semibold text-white mb-2">{data.disclaimers.contentLiabilityLabel}</h5>
              <p className="text-sm">{data.disclaimers.contentLiability}</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-2">{data.disclaimers.linkLiabilityLabel}</h5>
              <p className="text-sm">{data.disclaimers.linkLiability}</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-2">{data.disclaimers.copyrightLabel}</h5>
              <p className="text-sm">{data.disclaimers.copyright}</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Sections */}
      {data?.additionalSections && data.additionalSections.length > 0 && (
        <div className="mt-8 space-y-8">
          {data.additionalSections.map((additionalSection, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-white mb-3">
                {additionalSection.title}
              </h4>
              <div className="text-white/90 leading-relaxed whitespace-pre-line text-sm">
                {additionalSection.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function LegalNoticeBlock({ data }: LegalNoticeBlockProps) {
  const title = data?.title || "Legal Notice"
  const subtitle = data?.subtitle || "Legal Information"
  const disclaimer = data?.disclaimer

  return (
    <div className="frosted-glass p-8 lg:p-12 rounded-2xl border border-white/20 flex-1 flex flex-col relative">
      {/* Disclaimer in top right corner */}
      {disclaimer && (
        <div className="absolute top-4 right-4 text-xs text-white/60 italic max-w-32 text-right leading-tight">
          {disclaimer}
        </div>
      )}
      
      {/* Title and Subtitle on each card */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-medium text-white mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-white/90 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="flex-1">
        <LegalNoticeContent data={data} />
      </div>
    </div>
  )
}

// Export with old name for backward compatibility
export { LegalNoticeBlock as ImprintBlock }