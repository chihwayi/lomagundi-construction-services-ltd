import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import DiamondDrilling from '@/components/DiamondDrilling'
import ConstructionSection from '@/components/ConstructionSection'
import DemolitionSection from '@/components/DemolitionSection'
import WhyUs from '@/components/WhyUs'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServicesOverview />
      <DiamondDrilling />
      <ConstructionSection />
      <DemolitionSection />
      <WhyUs />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
