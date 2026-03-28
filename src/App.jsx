import Navbar from './components/Navbar'
import StarField from './components/StarField'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-sand-950 text-sand-100">
      <StarField />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  )
}
