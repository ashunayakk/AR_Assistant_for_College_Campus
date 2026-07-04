import model1 from '../assets/campus-model-1.png'
import model2 from '../assets/campus-model-2.png'

export default function Gallery() {
  return (
    <section id="gallery">
      <h2>3D Model of College, Made in Revit Architecture</h2>
      <div className="gallery-grid">
        <img src={model1} alt="3D campus model rendered in Autodesk Revit, view one" />
        <img src={model2} alt="3D campus model rendered in Autodesk Revit, view two" />
      </div>
    </section>
  )
}
