import { useState, useEffect } from "react";
import "../index.css"; // This file contains CSS animations
import React from "react";

// eslint-disable-next-line react/prop-types
const FlipCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [flipState, setFlipState] = useState({
    days: [false, false],
    hours: [false, false],
    minutes: [false, false],
    seconds: [false, false],
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const newTimeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((difference / (1000 * 60)) % 60)
        ).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };

      // Trigger flip animation for changed digits
      for (let unit in newTimeLeft) {
        const newDigits = newTimeLeft[unit].split("");
        const oldDigits = timeLeft[unit].split("");

        const newFlipState = newDigits.map((digit, index) =>
          digit !== oldDigits[index]
        );

        setFlipState((prev) => ({
          ...prev,
          [unit]: newFlipState,
        }));
      }

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const renderDigits = (value, unit) => (
    <div className="flex gap-[2px]">
      {value.split("").map((digit, index) => (
        <div
          key={index}
          className="flex flex-col gap-[2px] items-center justify-center relative"
        >
          {/* Upper Flap with Flip Animation */}
          <div
            className={`w-8 h-8 md:w-16 md:h-16 bg-[#FA5596] rounded-[4px] upper-flap ${
              flipState[unit][index] ? "flip" : ""
            }`}
            onAnimationEnd={() => {
              // Reset flip animation state after it ends
              setFlipState((prev) => {
                const updatedFlipState = [...prev[unit]];
                updatedFlipState[index] = false;
                return { ...prev, [unit]: updatedFlipState };
              });
            }}
          ></div>

          {/* Lower Flap */}
          <div className="w-8 h-8 md:w-16 md:h-16 bg-[#FA5596] rounded-[4px]"></div>

          {/* Digit */}
          <p className="absolute text-[32px] md:text-[80px]">{digit}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex gap-4 md:gap-[96px] items-center justify-center">
      {/* Days */}
      <div className="font-angrybirds flex flex-col gap-4">
        {renderDigits(timeLeft.days, "days")}
        <div>
          <p className="font-angrybirds text-base">DAYS</p>
        </div>
      </div>

      {/* Hours */}
      <div className="font-angrybirds flex flex-col gap-4">
        {renderDigits(timeLeft.hours, "hours")}
        <div>
          <p className="font-angrybirds text-base">HOURS</p>
        </div>
      </div>

      {/* Minutes */}
      <div className="font-angrybirds flex flex-col gap-4">
        {renderDigits(timeLeft.minutes, "minutes")}
        <div>
          <p className="font-angrybirds text-base">MINUTES</p>
        </div>
      </div>

      {/* Seconds */}
      <div className="font-angrybirds flex flex-col gap-4">
        {renderDigits(timeLeft.seconds, "seconds")}
        <div>
          <p className="font-angrybirds text-base">SECONDS</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCountdown;
