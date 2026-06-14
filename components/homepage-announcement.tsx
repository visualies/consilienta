import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type HomepageAnnouncementData } from "@/lib/get-globals"

const defaultEventLink = '/insights/unlocking-biotech-value-speed-to-first-in-human-matters'
const defaultRegistrationLink =
  'https://www.eventbrite.com/e/unlocking-biotech-value-speed-to-first-in-human-matters-tickets-1990111686627'
const defaultLabel = 'Upcoming workshop'
const defaultTitle = 'Catalent/Consilienta Workshop'
const defaultDescription = 'Unlocking Biotech Value: Speed to First-in-Human Matters'
const defaultDateText = 'Tuesday, 23 June 2026 from 1.00 - 5.30 pm'
const defaultLocationText = 'BioM Biotech Cluster Development GmbH, Am Klopferspitz 19a, 82152 Martinsried, Germany'
const defaultRegistrationText = 'Register here'
const detailsCtaText = 'Event details'

function getPostLink(post: HomepageAnnouncementData['post']) {
  if (typeof post === 'object' && post?.slug) {
    return `/insights/${post.slug}`
  }

  return undefined
}

function getRegistrationLink(data: HomepageAnnouncementData, detailsHref: string) {
  if (data.ctaLink && data.ctaLink !== detailsHref) {
    return data.ctaLink
  }

  if (typeof data.post === 'object' && data.post?.registrationUrl) {
    return data.post.registrationUrl
  }

  return defaultRegistrationLink
}

function getAnnouncementLabel(label?: string) {
  if (!label || label === 'Catalent/Consilienta Workshop') {
    return defaultLabel
  }

  return label
}

function getRegistrationText(text?: string) {
  if (!text || text === 'Registration Link') {
    return defaultRegistrationText
  }

  return text
}

export function HomepageAnnouncement({ data }: { data?: HomepageAnnouncementData }) {
  if (!data?.enabled) {
    return null
  }

  if (data.hideAfter && new Date(data.hideAfter).getTime() < Date.now()) {
    return null
  }

  const detailsHref = getPostLink(data.post) || defaultEventLink
  const registrationHref = getRegistrationLink(data, detailsHref)
  const label = getAnnouncementLabel(data.label)
  const registrationText = getRegistrationText(data.ctaText)

  return (
    <section className="px-6 pb-8 pt-1">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg bg-white p-5 shadow-lg outline outline-1 outline-white/30 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Badge className="border-0 bg-brand text-white">{label}</Badge>
              <div>
                <h2 className="mb-2 text-xl font-serif font-normal leading-snug text-gray-900 lg:text-2xl">
                  {data.title || defaultTitle}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-600 lg:text-base">{data.description || defaultDescription}</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand" />
                  {data.dateText || defaultDateText}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" />
                  {data.locationText || defaultLocationText}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button variant="primary" className="w-full sm:w-fit" asChild>
                <Link href={registrationHref} target="_blank" rel="noopener noreferrer">
                  {registrationText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-white sm:w-fit" asChild>
                <Link href={detailsHref}>
                  {detailsCtaText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
