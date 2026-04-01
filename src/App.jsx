import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorTrail from './components/CursorTrail'
import MusicPlayer from './components/MusicPlayer'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-sand-100">
      <LoadingScreen />
      <CursorTrail />
      <MusicPlayer />
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
