import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Timeline from './components/Timeline'
import Toolkit from './components/Toolkit'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-sand-950 text-sand-100">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Timeline />
      <Toolkit />
      <Clients />
      <Contact />
      <Footer />
    </div>
  )
}
