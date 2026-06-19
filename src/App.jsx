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
const WhyMmm = lazy(() => import('./components/sections/WhyMmm.jsx'))
const Projects = lazy(() => import('./components/sections/Projects.jsx'))
const Process = lazy(() => import('./components/sections/Process.jsx'))
const Team = lazy(() => import('./components/sections/Team.jsx'))
const CTA = lazy(() => import('./components/sections/CTA.jsx'))
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
  const [splashDone, setSplashDone] = useState(() => localStorage.getItem('splash') === '1')

  function handleSplashFinish() {
    localStorage.setItem('splash', '1')
    setSplashDone(true)
  }

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
      </Routes>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}

export default App
