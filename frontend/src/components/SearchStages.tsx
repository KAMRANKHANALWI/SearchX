"use client";

import { motion, AnimatePresence } from "motion/react";
import { SearchStagesProps } from "@/types";

const StageIndicator = ({
  text,
  isFirst = false,
}: {
  text: string;
  isFirst?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className={`flex items-center space-x-3 gap-4 ${isFirst ? "" : "pt-2"}`}
  >
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    <span className="text-sm text-gray-300">{text}</span>
  </motion.div>
);

const UrlList = ({ urls }: { urls: string[] }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
    className="pl-5 mt-2 space-y-1.5 border-l border-slate-700"
  >
    {urls.map((url, index) => (
      <motion.a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variants={{
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        }}
        className="text-xs text-blue-400 hover:text-blue-300 truncate block max-w-md"
      >
        {url}
      </motion.a>
    ))}
  </motion.div>
);

export default function SearchStages({ searchInfo }: SearchStagesProps) {
  const { stages, query, urls } = searchInfo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex justify-start"
    >
      <div className="bg-slate-800/70 text-gray-100 rounded-2xl px-4 py-3 border border-slate-600/30 shadow-lg backdrop-blur-lg w-full max-w-2xl">
        <div className="space-y-2">
          <AnimatePresence>
            {stages.includes("searching") && (
              <StageIndicator text={`Searching for: "${query}"`} isFirst />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {stages.includes("reading") && (
              <div>
                <StageIndicator text="Reading sources..." />
                {urls && urls.length > 0 && <UrlList urls={urls} />}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
