import icon from '/icon.PNG';
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      {/* Outer spinner ring */}
      <div className="relative flex items-center justify-center">
        <div className="w-36 h-36 border-4 border-t-[#e99b63] border-gray-600 rounded-full animate-spin"></div>

        {/* Center icon */}
        <img
          src={icon}
          alt="Loading"
          className="absolute w-50 h-50 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;