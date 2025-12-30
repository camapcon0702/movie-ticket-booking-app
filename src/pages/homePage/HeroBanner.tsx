export const HeroBanner = () => {
  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      <img
        src="https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r 
                      from-black/80 via-black/50 to-transparent" />
                      
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 text-white">
        <span className="text-sm font-semibold text-red-500">
          MARVEL STUDIOS
        </span>

        <h1 className="mt-3 text-5xl font-extrabold leading-tight">
          Guardians <br /> of the Galaxy
        </h1>

        <p className="mt-4 max-w-xl text-gray-300">
          A group of intergalactic criminals must pull together to stop a
          fanatical warrior with plans to purge the universe.
        </p>

        <div className="mt-6 flex gap-4">
          <button className="rounded-full bg-[#F84565] px-6 py-3 
                             text-sm font-bold hover:opacity-90">
            Book Now
          </button>

          <button className="rounded-full border border-white/40 
                             px-6 py-3 text-sm font-semibold">
            Watch Trailer
          </button>
        </div>
      </div>
    </section>
  );
};
