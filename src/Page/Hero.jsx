
import HeroImage from "../image/h1.png"; 
const Hero = () => {
    return (
         <section
     
      className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      
      <div className="absolute inset-0 bg-black/50"></div>

      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="mb-8 text-lg md:text-2xl">
          Discover rooms, hotels, and destinations
        </p>

       
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto border border-white/20">
          <input
            type="text"
            placeholder="Enter city or address"
            className="flex-1 px-4 py-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-[#0b1e3b] px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all active:scale-95">
            Search
          </button>
        </div>
      </div>
    </section>


    );
};

export default Hero;