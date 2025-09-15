"use client";

import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { InputBoxProps } from "@/types";
import { SEARCH_PLACEHOLDERS } from "@/constants";
import { STYLES } from "@/constants/styles";

export default function InputBox({
  onMessageSend,
  onDeepResearchToggle,
}: InputBoxProps) {
  const [deepResearch, setDeepResearch] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = () => {
    // Handle input changes if needed
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    if (message?.trim() && onMessageSend) {
      onMessageSend(message.trim());
    }
  };

  const handleToggleDeepResearch = () => {
    setDeepResearch((prev) => !prev);
  };

  // Notify parent when deepResearch changes
  React.useEffect(() => {
    onDeepResearchToggle?.(deepResearch);
  }, [deepResearch, onDeepResearchToggle]);

  return (
    <div className={STYLES.RESPONSIVE.INPUT_CONTAINER}>
      <div className="relative">
        {/* Main Input Component */}
        <PlaceholdersAndVanishInput
          placeholders={
            deepResearch
              ? SEARCH_PLACEHOLDERS.DEEP_RESEARCH
              : SEARCH_PLACEHOLDERS.WEB_SEARCH
          }
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        {/* Deep Research Toggle Button with Tooltip */}
        {/* Positioned absolutely relative to its parent div */}
        <div className="absolute right-8.5 md:right-12 lg:right-12 top-1/2 transform -translate-y-1/2 z-50">
          <div className="relative">
            {/* Tooltip*/}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl text-center max-w-[180px] sm:max-w-[220px]"
                >
                  <p className="text-xs text-white font-medium">
                    Deep Research Agent
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
              onClick={handleToggleDeepResearch}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 rounded-full p-0.5 relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: deepResearch
                    ? "conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #667eea)"
                    : "linear-gradient(45deg, #374151, #4b5563, #6b7280)",
                  animation: deepResearch ? "spin 2s linear infinite" : "none",
                }}
              />

              {/* Inner Button */}
              <div
                className={`absolute inset-0.5 z-1 rounded-full flex items-center justify-center transition-colors duration-300 bg-zinc-900`}
              >
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex items-center justify-center">
                  {/* Logo */}
                  <Image
                    src="/Deep-Research.svg"
                    alt="Deep Research"
                    width={24}
                    height={24}
                    priority
                    className={`w-full h-full filter grayscale brightness-0 invert`}
                  />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
