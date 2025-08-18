import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedLegalNotice() {
  try {
    const payload = await getPayload({ config })

    // Check if legal-notice page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'legal-notice'
        }
      }
    })

    const pageData = {
      title: 'Legal Notice',
      slug: 'legal-notice',
      meta: {
        title: 'Legal Notice - Consilienta GmbH',
        description: 'Angaben gemäß § 5 TMG',
      },
      layout: [
        {
          blockType: 'legal-notice',
          pageTitle: 'Legal Notice',
          pageSubtitle: 'Legal Information',
          title: 'Deutsch',
          subtitle: 'Angaben gemäß § 5 TMG',
          companyInfo: {
            companyName: 'Consilienta GmbH',
            address: 'Hanfelder Str. 6\n81475 München\nDeutschland'
          },
          contactInfo: {
            contactLabel: 'Kontakt',
            phoneLabel: 'Telefon',
            emailLabel: 'E-Mail',
            phone: '[bitte einfügen]',
            email: 'info@consilienta.com'
          },
          managingDirectors: {
            label: 'Vertreten durch die Geschäftsführer',
            directors: 'Dr. Elena Meurer,\nDr. Liron Sarid-Krebs\nDr. Tiina Palomäki'
          },
          registrationInfo: {
            registerLabel: 'Registereintrag',
            commercialRegisterLabel: 'Handelsregister',
            registrationNumberLabel: 'Registernummer',
            commercialRegister: 'Amtsgericht München',
            registerNumber: 'HRB 302328'
          },
          vatInfo: {
            vatLabel: 'Umsatzsteuer-ID',
            vatDescription: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG',
            vatId: 'DE[bitte einfügen]'
          },
          responsiblePerson: {
            label: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
            name: 'Dr. Elena Meurer',
            companyName: 'Consilienta GmbH',
            address: 'Hanfelder Str. 6\n81475 München'
          },
          disclaimers: {
            disclaimerTitle: 'Haftungsausschluss',
            contentLiabilityLabel: 'Haftung für Inhalte',
            contentLiability: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
            linkLiabilityLabel: 'Haftung für Links',
            linkLiability: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
            copyrightLabel: 'Urheberrecht',
            copyright: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.'
          },
          additionalSections: [
            {
              title: 'EU-Streitschlichtung',
              content: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.\n\nWir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
            }
          ]
        }
      ],
      status: 'published'
    }

    if (existingPages.docs.length > 0) {
      console.log('Legal notice page already exists. Updating with German content...')
      
      // Update existing page
      await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData
      })
      
      console.log('Legal notice page updated successfully!')
    } else {
      // Create new page
      await payload.create({
        collection: 'pages',
        data: pageData
      })
      
      console.log('Legal notice page created successfully!')
    }

  } catch (error) {
    console.error('Error seeding legal notice:', error)
    throw error
  }
}

seedLegalNotice()
  .then(() => {
    console.log('Legal notice seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Legal notice seeding failed:', error)
    process.exit(1)
  })