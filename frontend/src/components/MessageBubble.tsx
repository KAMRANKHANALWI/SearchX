"use client";

import { Message, MessageType } from "@/types";
import { STYLES } from "@/constants/styles";

interface MessageBubbleProps {
  message: Message;
}

// Helper function to format AI content
const formatAIContent = (content: string): string => {
  console.log(content);
  return content
    .replace(/\*+$/, "")
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-bold text-yellow-300 text-lg tracking-wide">$1</strong>'
    )
    .replace(/\*(.*?)\*/g, '<em class="italic text-fuchsia-300">$1</em>')
    .replace(/\_(.*?)\_/g, '<em class="italic text-fuchsia-300">$1</em>')
    .replace(
      /^\s*\*\s/gm,
      '<span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mb-1"></span>'
    )
    .replace(/\n/g, "<br />");
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { type, content, error } = message;
  const isUser = type === MessageType.USER;

  const getBubbleClasses = () => {
    const baseClasses = STYLES.MESSAGE.BUBBLE_BASE;

    if (error) {
      return `${baseClasses} ${STYLES.MESSAGE.ERROR_BUBBLE}`;
    }

    return `${baseClasses} ${
      isUser ? STYLES.MESSAGE.USER_BUBBLE : STYLES.MESSAGE.AI_BUBBLE
    }`;
  };

  return (
    <div className={getBubbleClasses()}>
      {type === MessageType.AI && !error ? (
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formatAIContent(content) }}
        />
      ) : (
        content
      )}
    </div>
  );
};
