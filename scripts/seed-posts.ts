import { loadEnvConfig } from '@next/env'
import { getPayload } from 'payload'

loadEnvConfig(process.cwd())

const eventSlug = 'unlocking-biotech-value-speed-to-first-in-human-matters'
const eventUrl = `/insights/${eventSlug}`
const registrationUrl =
  'https://www.eventbrite.com/e/unlocking-biotech-value-speed-to-first-in-human-matters-tickets-1990111686627'
const eventTitle = 'Unlocking Biotech Value: Speed to First-in-Human Matters'
const eventDescription =
  'Tuesday, June 23  •  1 PM – 5.30 PM @ BioM Biotech Cluster Development, Munich'
const eventDateText = 'Tuesday, 23 June 2026 from 1.00 - 5.30 pm'
const eventLocation = 'BioM Biotech Cluster Development GmbH, Am Klopferspitz 19a, 82152 Martinsried'
const eventContent = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Reaching FIH is not only a key scientific milestone, but also a critical driver of value creation and partnership readiness.',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Together with Catalent Pharma Services, Consilienta organises a FREE interactive workshop designed to help biotech innovators efficiently navigate CMC, non-clinical, and regulatory challenges on the path to clinical development.',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'The workshop will bring together experts from across the field to share practical strategies and real-world insights on:',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
      {
        tag: 'ul',
        type: 'list',
        start: 1,
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'listitem',
            value: 1,
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Rational drug product design in early development and how to avoid delays caused by formulation decisions',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
          },
          {
            type: 'listitem',
            value: 2,
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Strategic use of EU regulatory pathways to accelerate drug development',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
          },
          {
            type: 'listitem',
            value: 3,
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'The role of New Approach Methodologies (NAM) in facilitating FIH',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
          },
          {
            type: 'listitem',
            value: 4,
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Technology transfer and CDMO selection strategies',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
          },
        ],
        listType: 'bullet',
        direction: 'ltr',
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Participants will benefit from an open discussion format and the opportunity for ',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
          {
            mode: 'normal',
            text: 'complimentary CMC and multidisciplinary regulatory consultation.',
            type: 'text',
            style: '',
            detail: 0,
            format: 1,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'If you would like to learn more about the workshop, please follow the link: ',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
          {
            type: 'linebreak',
            version: 1,
          },
          {
            type: 'autolink',
            fields: {
              url: registrationUrl,
              linkType: 'custom',
            },
            format: '',
            indent: 0,
            version: 2,
            children: [
              {
                mode: 'normal',
                text: registrationUrl,
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Registration is open. Participation is free of charge ',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
          {
            type: 'linebreak',
            version: 1,
          },
          {
            mode: 'normal',
            text: 'Unlocking Biotech Value: Speed to First-in-Human Matters Tickets',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
    ],
    direction: 'ltr',
  },
}
const insightsLayout = [
  {
    blockType: 'postsArchive',
    eyebrow: 'Insights & News',
    title: 'Insights & News',
    intro: '',
    showFilters: true,
  },
]

async function clearInsightsIntro(payload: Awaited<ReturnType<typeof getPayload>>) {
  const insightsPage = await payload.find({
    collection: 'pages' as never,
    where: {
      slug: {
        equals: 'insights',
      },
    },
    limit: 1,
  })

  if (!insightsPage.docs[0]) {
    throw new Error('Insights page not found')
  }

  const page = insightsPage.docs[0] as { id: string; layout?: Array<Record<string, unknown>> }
  const layout = (page.layout || []).map((block) => {
    if (block.blockType !== 'postsArchive') {
      return block
    }

    return {
      ...block,
      intro: '',
    }
  })

  await payload.update({
    collection: 'pages' as never,
    id: page.id,
    data: {
      layout,
    } as never,
  })
}

async function seedPosts() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const contentOnly = process.argv.includes('--content-only')
  const clearIntroOnly = process.argv.includes('--clear-insights-intro')

  if (clearIntroOnly) {
    await clearInsightsIntro(payload)
    console.log('Cleared insights intro')
    return
  }

  if (contentOnly) {
    const existing = await payload.find({
      collection: 'posts' as never,
      where: {
        slug: {
          equals: eventSlug,
        },
      },
      limit: 1,
    })

    if (!existing.docs[0]) {
      throw new Error(`Post not found: ${eventSlug}`)
    }

    const post = await payload.update({
      collection: 'posts' as never,
      id: (existing.docs[0] as { id: string }).id,
      data: {
        content: eventContent,
      } as never,
    })

    console.log('Updated post content:', (post as { id: string }).id)
    return
  }

  const postData = {
    title: eventTitle,
    slug: eventSlug,
    postType: 'event',
    status: 'published',
    publishedAt: '2026-06-14T00:00:00+02:00',
    eventStartAt: '2026-06-23T13:00:00+02:00',
    eventEndAt: '2026-06-23T17:30:00+02:00',
    eventLocation,
    registrationUrl,
    excerpt: eventDescription,
    metaTitle: 'Unlocking Biotech Value: Speed to First-in-Human Matters | Consilienta',
    metaDescription:
      'Join Consilienta and Catalent at BioM, Martinsried, for a free workshop on CMC, non-clinical, and regulatory strategies for first-in-human development.',
    noIndex: false,
    content: eventContent,
  }

  const existing = await payload.find({
    collection: 'posts' as never,
    where: {
      slug: {
        equals: eventSlug,
      },
    },
    limit: 1,
  })

  const post = existing.docs[0]
    ? await payload.update({
        collection: 'posts' as never,
        id: (existing.docs[0] as { id: string }).id,
        data: postData as never,
      })
    : await payload.create({
        collection: 'posts' as never,
        data: postData as never,
      })

  const globals = await payload.findGlobal({
    slug: 'globals',
    depth: 1,
  })

  await payload.updateGlobal({
    slug: 'globals',
    data: {
      header: {
        ...(globals.header || {}),
        navigation: [
          { label: 'Home', link: '/' },
          { label: 'How We Help', link: '/how-we-help' },
          { label: 'About Us', link: '/about-us' },
          { label: 'Insights & News', link: '/insights' },
          { label: 'Careers', link: '/careers' },
        ],
      },
      homepageAnnouncement: {
        enabled: true,
        label: 'Catalent/Consilienta Workshop',
        title: 'Catalent/Consilienta Workshop',
        description: 'Unlocking Biotech Value: Speed to First-in-Human Matters',
        dateText: eventDateText,
        locationText: 'BioM Biotech Cluster Development GmbH, Am Klopferspitz 19a, 82152 Martinsried, Germany',
        ctaText: 'Registration Link',
        ctaLink: eventUrl,
        post: (post as { id: string }).id,
        hideAfter: '2026-06-23T17:30:00+02:00',
      },
    } as never,
  })

  const insightsPage = await payload.find({
    collection: 'pages' as never,
    where: {
      slug: {
        equals: 'insights',
      },
    },
    limit: 1,
  })

  if (insightsPage.docs[0]) {
    await payload.update({
      collection: 'pages' as never,
      id: (insightsPage.docs[0] as { id: string }).id,
      data: {
        title: 'Insights & News',
        slug: 'insights',
        meta: {
          title: 'Insights & News | Consilienta',
          description: '',
        },
        layout: insightsLayout,
        status: 'published',
      } as never,
    })
  } else {
    await payload.create({
      collection: 'pages' as never,
      data: {
        title: 'Insights & News',
        slug: 'insights',
        meta: {
          title: 'Insights & News | Consilienta',
          description: '',
        },
        layout: insightsLayout,
        status: 'published',
      } as never,
    })
  }

  console.log(existing.docs[0] ? 'Updated post:' : 'Created post:', (post as { id: string }).id)
  console.log('Updated homepage announcement:', eventUrl)
  console.log('Updated insights page posts archive')
}

seedPosts()
  .then(() => {
    console.log('Post seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Post seeding failed:', error)
    process.exit(1)
  })
