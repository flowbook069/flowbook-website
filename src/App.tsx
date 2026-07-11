import Footer from './components/Footer'
import FinalCTA from './components/FinalCTA'
import FAQ from './components/FAQ'
import Hero from './components/Hero'
import MobileStaffViews from './components/MobileStaffViews'
import Navbar from './components/Navbar'
import OrderStory from './components/OrderStory'
import OwnerBrief from './components/OwnerBrief'
import PricingPlans from './components/PricingPlans'
import ScrollRevealRuntime from './components/ScrollRevealRuntime'
import SmartCRM from './components/SmartCRM'

export default function App() {
  return (
    <>
      <ScrollRevealRuntime />
      <Navbar />
      <main>
        <Hero />
        <OrderStory />
        <SmartCRM />
        <OwnerBrief />
        <MobileStaffViews />
        <PricingPlans />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
