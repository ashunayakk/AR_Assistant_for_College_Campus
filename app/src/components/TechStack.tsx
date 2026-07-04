const STACK = [
  { label: 'Augmented Reality', value: 'ARway' },
  { label: '3D Modeling', value: 'Autodesk Revit, Blender' },
  { label: 'Development Tools', value: 'ARway, Google ARCore' },
  { label: 'Activation', value: 'ARway QR' },
]

export default function TechStack() {
  return (
    <section id="tech-stack">
      <h2>Tech Stack</h2>
      <dl className="stack-list">
        {STACK.map((item) => (
          <div className="stack-item" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
