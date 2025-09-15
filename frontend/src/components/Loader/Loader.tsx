"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import "./Loader.css";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Loader = ({ onFinished }: { onFinished: () => void }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
      onComplete: onFinished,
    });

    tl.to(".block", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1,
      delay: 0.75,
    });
  }, [onFinished]);

  return (
    <div className="loader">
      <div className="overlay">
        <div className="block"></div>
        <div className="block"></div>
      </div>
    </div>
  );
};

export default Loader;
