export default function BookingRequest() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-inter">
      
      

      {/* Profile */}
      <div className="absolute top-[26px] right-[40px] text-center">
        <img
          src="/Ellipse1.png"
          alt="Profile"
          className="w-[123px] h-[113px] rounded-full"
        />
        <p className="mt-2 text-2xl font-semibold">Jack</p>
      </div>

      {/* Title */}
      <h1 className="absolute top-[246px] left-[395px] text-5xl font-bold">
        Request Resource Booking
      </h1>

      <p className="absolute top-[311px] left-[395px] text-2xl text-gray-500">
        Submit a reservation request for classrooms, laboratories, or seminar halls
      </p>

      {/* Resource Card */}
      <div className="absolute top-[304px] left-[385px] w-[945px] h-[190px] border rounded-2xl p-6">
        <h2 className="text-2xl font-medium">Resource Details</h2>

        <div className="flex gap-6 mt-6">
          <div className="w-[348px] h-[69px] bg-gray-200 rounded-xl flex items-center justify-center">
            Select Department
          </div>

          <div className="w-[280px] h-[69px] bg-gray-200 rounded-xl flex items-center justify-center">
            Select Room
          </div>

          <button className="w-[220px] h-[69px] bg-gray-300 rounded-xl font-medium">
            Check Status
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button className="absolute bottom-[60px] right-[120px] w-[383px] h-[67px] rounded-2xl bg-gradient-to-r from-[#F0ADA4] via-[#896965] to-[#737373] text-white text-xl font-semibold">
        Submit Booking Request
      </button>
    </div>
  );
}