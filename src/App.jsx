import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Marquee from './components/sections/Marquee.jsx'
import Services from './components/sections/Services.jsx'
import WhyMmm from './components/sections/WhyMmm.jsx'
import Projects from './components/sections/Projects.jsx'
import Process from './components/sections/Process.jsx'
import Stats from './components/sections/Stats.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import TechStack from './components/sections/TechStack.jsx'
import CTA from './components/sections/CTA.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import BackToTop from './components/ui/BackToTop.jsx'

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhyMmm />
        <Projects />
        <Process />
        <Stats />
        <Testimonials />
        <TechStack />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
