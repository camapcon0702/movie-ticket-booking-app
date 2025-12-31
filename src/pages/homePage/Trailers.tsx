import { Play } from "lucide-react";

export const Trailers = () => {
  return (
    <section className="bg-gradient-to-b from-black to-[#0b0b0b] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-2xl font-extrabold text-white">
          Trailers
        </h2>

        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
            className="h-[420px] w-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center 
                          bg-black/40">
            <button className="flex h-20 w-20 items-center justify-center 
                               rounded-full bg-[#F84565] text-white 
                               hover:scale-105 transition">
              <Play size={36} fill="white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
