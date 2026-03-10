


function App() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold text-center text-blue-500">
        Tailwind + DaisyUI Check
      </h1>

      {/* DaisyUI Buttons */}
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
      </div>


      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure>
          <img
            src="https://picsum.photos/400/200"
            alt="Sample"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">DaisyUI Card</h2>
          <p>This is a sample card using DaisyUI!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>
      </div>
    </div>
  );
}





export default App;