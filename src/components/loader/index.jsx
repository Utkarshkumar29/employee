import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-40 m-2 z-20">
      <div className="relative">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
        <div className="absolute h-16 w-16 overflow-hidden rounded-full">
          <div className=" h-full w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
