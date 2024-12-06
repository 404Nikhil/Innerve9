import React from "react";

import Piggy from "../assets/piggy.svg";

const Heading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="relative font-angrybirds text-[80px] md:text-[172px] line leading-[100%]">
        INNERVE 9
        <img
        src={Piggy}
        alt="piggy"
        className="absolute w-5 md:w-10 top-5 md:top-12 left-[91%]"
      />
      </div>
      <p className="font-angrybirds md:text-[32px]">
        INDIA&apos;S LARGEST STUDENT DRIVEN HACKATHON
      </p>
      
    </div>
  );
};

export default Heading;
