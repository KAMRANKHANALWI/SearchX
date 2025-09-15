"use client";

import InputBox from "@/components/InputBox";
import { useState } from "react";
import MessageSection from "@/components/MessageSection";
import CommonLayout from "@/components/CommonLayout";
import { useChat } from "@/hooks/useChat";
import ProfileButton from "@/components/ProfileButton";
import AuthCheck from "@/components/AuthCheck";
import { DEEP_RESEARCH_MESSAGE } from "@/constants";

export default function Home() {
  const [deepResearch, setDeepResearch] = useState(false);
  const { messages, handleMessageSend } = useChat();

  const handleDeepResearchToggle = (enabled: boolean) => {
    setDeepResearch(enabled);
  };

  return (
    <AuthCheck>
      <CommonLayout>
        <ProfileButton />
        <div className="flex flex-col items-center justify-evenly px-4 py-4 sm:py-6 md:py-8 h-full">
          <div className="relative flex flex-col items-center justify-center">
            {/* Title And Description */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-gray-400 via-zinc-300 to-gray-400 bg-clip-text text-transparent">
              searchx
            </h1>

            {/* Dynamic Description */}
            <p
              className={`text-sm italic sm:text-base md:text-lg text-center mb-4 sm:mb-6 transition-all bg-clip-text text-transparent animate-gradient ${
                deepResearch
                  ? "bg-gradient-to-r from-[#667eea] to-[#4facfe]"
                  : "bg-gradient-to-r from-[#1e293b] to-[#cbd5e1]"
              }`}
            >
              {deepResearch
                ? "detailed report in minutes"
                : "crawl the web in seconds"}
            </p>

            {/* Chat-Section or Warning */}
            {deepResearch ? (
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-72 px-4 py-6 mx-auto flex flex-col justify-center items-center text-center rounded-xl">
                <p className="text-sm sm:text-base text-white mb-3">
                  {DEEP_RESEARCH_MESSAGE.DISABLED_TITLE}
                </p>
                <br />
                <p className="text-sm sm:text-base text-white mb-2">
                  {DEEP_RESEARCH_MESSAGE.ALTERNATIVE_SUGGESTION}
                </p>
                <a
                  href={DEEP_RESEARCH_MESSAGE.GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-blue-300 transition-colors"
                  aria-label="Visit GPT Researcher GitHub Repository"
                >
                  {DEEP_RESEARCH_MESSAGE.GITHUB_TEXT}
                </a>
              </div>
            ) : (
              <MessageSection messages={messages} />
            )}
          </div>

          {/* InputBox */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <InputBox
              onMessageSend={handleMessageSend}
              onDeepResearchToggle={handleDeepResearchToggle}
            />
          </div>
        </div>
      </CommonLayout>
    </AuthCheck>
  );
}
