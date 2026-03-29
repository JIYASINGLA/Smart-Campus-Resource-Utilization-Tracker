const Header = () => {
  return (
    <header className="flex flex-col items-center justify-between gap-4 px-6 py-4 bg-white shadow-sm md:flex-row md:px-10">
      
      {/* Left: Logo + University Name */}
      <div className="flex items-center gap-4 text-center md:text-left">
        <img
          src="/mmdu-logo.png"
          alt="MMDU Logo"
          className="w-14 md:w-16"
        />
        <h1 className="text-sm font-semibold leading-tight md:text-lg">
          Maharishi Markandeshwar (Deemed to be University), Mullana, Ambala
        </h1>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-9 h-9"
        />
        <span className="font-medium text-gray-700">Jack</span>
      </div>

    </header>
  );
};

export default Header;