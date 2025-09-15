"use client";

import React, { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import { DotBackgroundDemo } from "./ui/GridBackground";
import gsap from "gsap";
import { CommonLayoutProps } from "@/types";
import { UI_CONSTANTS } from "@/constants";
import { STYLES } from "@/constants/styles";

const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  showLoader = true,
  onLoaderFinished,
}) => {
  const [loading, setLoading] = useState(showLoader);

  const handleLoaderFinished = () => {
    setLoading(false);
    onLoaderFinished?.();
  };

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".mainContent",
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: UI_CONSTANTS.CONTENT_ANIMATION_DURATION,
          ease: "power2.inOut",
        }
      );
    }
  }, [loading]);

  return (
    <div className={STYLES.CONTAINER.FULL_SCREEN}>
      {loading && <Loader onFinished={handleLoaderFinished} />}
      <DotBackgroundDemo />

      <div
        className={STYLES.CONTAINER.MAIN_CONTENT}
        style={{ opacity: loading ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
