import { useReducedMotion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { ProductScenes } from './components/sections/ProductScenes'
import { Ticker } from './components/sections/Ticker'
import { Values } from './components/sections/Values'
import { useLenis } from './lib/useLenis'

function App() {
  const reduceMotion = useReducedMotion()
  useLenis({ enabled: !reduceMotion })

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Ticker />
        <ProductScenes />
        <Values />
      </main>
      <Footer />
    </div>
  )
}

export default App
