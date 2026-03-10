
// import bgImg  from "../image/h2.png"; 

const CarouselSlide = ({image }) => {
  return (
    <section
      className="w-full h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${image})` }}
    >
      
    
   
    </section>
  );
};

export default CarouselSlide;
