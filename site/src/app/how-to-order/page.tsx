import {getSiteSettings} from '@/sanity'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HowToOrderClient from '@/components/HowToOrderClient'
import OfferBar from '@/components/OfferBar'

export const dynamic = 'force-dynamic'

export default async function HowToOrderPage() {
  const settings = await getSiteSettings()

  return (
    <main className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-[var(--margin)] py-10 sm:py-14">
        <HowToOrderClient settings={settings} />
      </section>
      <SiteFooter />
    </main>
  )
}
