import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import TrialForm from '@/components/sections/TrialForm'
import Schedule from '@/components/sections/Schedule'
import SpecialPrograms from '@/components/sections/SpecialPrograms'
import Trainers from '@/components/sections/Trainers'
import Gallery from '@/components/sections/Gallery'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Stats />
      <TrialForm />
      <Schedule />
      <SpecialPrograms />
      <Trainers />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
