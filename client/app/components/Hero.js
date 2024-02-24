export const Hero = () => {
  return (
    <div className="w-full h-[83.33vh] relative overflow-hidden">
      <img
        className="top-0 left-0 w-full h-full object-cover"
        src="hero.jpeg"
        alt="one piece egghead arc wallpaper"
      />
      <div className="bg-gradient-to-b from-transparent to-black absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-white">
        <div className="md:left-[10%] max-w-[1100px] m-auto absolute p-4">
          <img src="logo.png" alt="logo one piece" className="w-96" />
          <p className="text-base lg:text-xl md:text-base max-w-[760px] drop-shadow-2xl font-bold py-4  whitespace-normal break-words">
            Embark on an egg-citing adventure with the "One Piece Egghead Arc".
            Where the Straw Hat Pirates stumble upon a mysterious island
            populated by quirky characters with egg-themed abilities.
          </p>

          <button className="border border-white uppercase font-bold p-2 px-4 duration-300 hover:border-orange-500 hover:text-orange-500 text-lg">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};
