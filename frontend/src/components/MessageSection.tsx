"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import SearchStages from "./SearchStages";
import { MessageBubble } from "./MessageBubble";
import { Message, MessageType, MessageSectionProps } from "@/types";
import { UI_CONSTANTS } from "@/constants";
import { STYLES } from "@/constants/styles";

// --- Main Component ---

export default function MessageSection({
  messages = [],
  onMessageCountChange,
}: MessageSectionProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    onMessageCountChange?.(messages.length);
  }, [messages.length, onMessageCountChange]);

  return (
    <div className={STYLES.RESPONSIVE.MESSAGE_SECTION}>
      <AnimatePresence>
        {messages.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className={`absolute top-[0%] w-full h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 ${STYLES.UTILS.GRADIENT_FADE} z-12`}
          />
        )}
      </AnimatePresence>

      <div
        className={`w-full overflow-y-auto space-y-6 px-2 sm:px-4 md:px-6 ${
          STYLES.UTILS.HIDE_SCROLLBAR
        } transition-all duration-500 ${
          messages.length <= 1
            ? "h-0 opacity-0 pointer-events-none"
            : `${STYLES.RESPONSIVE.CHAT_HEIGHT} opacity-100`
        }`}
      >
        <AnimatePresence>
          {messages.map((message) => {
            const isSearching =
              message.type === MessageType.AI &&
              // @ts-expect-error Unnecessary Type error
              message.searchInfo?.stages?.length > 0 &&
              !message.content;

            if (isSearching && message.searchInfo) {
              return (
                <SearchStages
                  key={`loader-${message.id}`}
                  searchInfo={message.searchInfo}
                />
              );
            }

            if (message.content) {
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex w-full ${
                    message.type === MessageType.USER
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <MessageBubble message={message} />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>

        <div ref={endRef} />
      </div>
    </div>
  );
}
