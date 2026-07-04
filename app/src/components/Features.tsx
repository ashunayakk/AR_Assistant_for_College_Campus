const FEATURES = [
  {
    icon: '🔳',
    title: 'QR Code Activation',
    description: 'Scan a QR code at any campus entrance to instantly launch the AR experience.',
  },
  {
    icon: '🕶️',
    title: 'AR Integration',
    description: 'Built on ARway for seamless, markerless augmented-reality navigation.',
  },
  {
    icon: '🏛️',
    title: '3D Campus Model',
    description: 'A high-quality 3D campus map created with Autodesk Revit and Blender.',
  },
  {
    icon: '🎓',
    title: 'User-Friendly',
    description: 'Designed to help new students and visitors navigate intuitively, no training needed.',
  },
]

export default function Features() {
  return (
    <section id="features">
      <h2>Key Features</h2>
      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon" aria-hidden="true">
              {f.icon}
            </span>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
