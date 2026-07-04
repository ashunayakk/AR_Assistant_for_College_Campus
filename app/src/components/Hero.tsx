import canteenGuide from '../assets/canteen-guide.png'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-copy">
        <p className="eyebrow">📍 AR Campus Navigation</p>
        <h1>Find your way around campus in AR</h1>
        <p className="lead">
          Scan the QR code at any entrance to launch your virtual assistant — get real-time
          directions and an immersive 3D campus map, no app search required.
        </p>
        <ol className="hero-steps">
          <li>Scan the QR code at the entrance.</li>
          <li>Install ARway when prompted.</li>
          <li>Ask the assistant where you want to go.</li>
        </ol>
      </div>
      <div className="hero-media">
        <img src={canteenGuide} alt="AR wayfinding guide overlay to the campus canteen" />
      </div>
    </section>
  )
}
