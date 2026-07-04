import Hero from './components/Hero'
import VirtualAssistant from './components/VirtualAssistant'
import Features from './components/Features'
import TechStack from './components/TechStack'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Hero />

      <section id="assistant-section">
        <h2>Try the Virtual Assistant</h2>
        <p className="section-lead">
          This is a preview of the in-app assistant. On campus, it launches automatically after
          you scan the entrance QR code.
        </p>
        <VirtualAssistant />
      </section>

      <Features />
      <TechStack />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
