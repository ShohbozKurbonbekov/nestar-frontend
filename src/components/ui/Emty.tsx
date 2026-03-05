import React from "react";
import Lottie from "lottie-react";
import emty from "../../libs/animations/no-data-found.json";

interface EmtyType {
  title?: string;
}
const Emty = ({ title = "No Result Found" }: EmtyType) => {
  return (
    <div className="py-5 w-full flex flex-col items-center justify-center">
      <Lottie
        animationData={emty}
        loop={true}
        className="w-full [&>svg]:w-full max-h-[70vh] sm:max-h-[80vh]"
      />
      <p className="text-gray-500 text-lg">{title}</p>
    </div>
  );
};

export default Emty;
