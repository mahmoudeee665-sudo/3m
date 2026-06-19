import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import BackToTop from './components/ui/BackToTop.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import WhatsAppButton from './components/ui/WhatsAppButton.jsx'
import SplashScreen from './components/ui/SplashScreen.jsx'
import Marquee from './components/sections/Marquee.jsx'
import Services from './components/sections/Services.jsx'
import SectionDivider from './components/ui/SectionDivider.jsx'
import WhyMmm from './components/sections/WhyMmm.jsx'
import Projects from './components/sections/Projects.jsx'
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
import Process from './components/sections/Process.jsx'
import Team from './components/sections/Team.jsx'
import CTA from './components/sections/CTA.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SectionDivider />
      <Services />
      <SectionDivider flip />
      <WhyMmm />
      <Projects />
      <Process />
      <Team />
      <CTA />
    </main>
  )
}

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Suspense fallback={null}><ProjectsPage /></Suspense>} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
      </Routes>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}

export default App
