"use client";

import { useState } from "react";
import { Message, MessageType, SearchInfo } from "@/types";
import { API_CONFIG, ERROR_MESSAGES, SEARCH_STAGES } from "@/constants";
import { generateId, formatApiUrl } from "@/lib/utils";
import {
  handleNetworkError,
  handleParsingError,
  ErrorType,
  handleError,
} from "@/lib/errorHandler";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [checkpointId, setCheckpointId] = useState(null);

  const handleMessageSend = (message: string) => {
    const userMessage: Message = {
      id: generateId("user-"),
      type: MessageType.USER,
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const aiResponseId = generateId("ai-");
      const aiMessages: Message = {
        id: aiResponseId,
        type: MessageType.AI,
        content: "",
        isLoading: true,
        searchInfo: {
          stages: [],
          query: "",
          urls: [],
        },
      };
      setMessages((prev) => [...prev, aiMessages]);

      const chatEndpoint = `${API_CONFIG.CHAT_ENDPOINT}/${encodeURIComponent(
        message
      )}`;
      let url = formatApiUrl(chatEndpoint, API_CONFIG.BASE_URL);
      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      const eventSource = new EventSource(url);
      let streamedContent = "";
      let searchData: SearchInfo | null = null;
      let isConnectionClosed = false;

      eventSource.onmessage = (event) => {
        try {
          let data;
          try {
            data = JSON.parse(event.data);
          } catch (error) {
            handleParsingError(error, event.data);
            return;
          }

          if (data.type === "checkpoint") {
            setCheckpointId(data.checkpoint_id);
          } else if (data.type === "content") {
            streamedContent += data.content;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              )
            );
          } else if (data.type === "search_start") {
            const newSearchInfo = {
              stages: [SEARCH_STAGES.SEARCHING],
              query: data.query,
              urls: [],
            };
            searchData = newSearchInfo;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponseId
                  ? {
                      ...msg,
                      content: streamedContent,
                      searchInfo: newSearchInfo,
                      isLoading: false,
                    }
                  : msg
              )
            );
          } else if (data.type === "search_results") {
            try {
              const urls =
                typeof data.urls === "string"
                  ? JSON.parse(data.urls)
                  : data.urls;
              const newSearchInfo = {
                stages: searchData
                  ? [...searchData.stages, SEARCH_STAGES.READING]
                  : [SEARCH_STAGES.READING],
                query: searchData?.query || "",
                urls: urls,
              };
              searchData = newSearchInfo;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiResponseId
                    ? {
                        ...msg,
                        content: streamedContent,
                        searchInfo: newSearchInfo,
                        isLoading: false,
                      }
                    : msg
                )
              );
            } catch (error) {
              handleParsingError(error, "search results");
            }
          } else if (data.type === "end") {
            if (searchData) {
              const finalSearchInfo = {
                ...searchData,
                stages: [...searchData.stages, SEARCH_STAGES.WRITING],
              };
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiResponseId
                    ? {
                        ...msg,
                        searchInfo: finalSearchInfo,
                        isLoading: false,
                      }
                    : msg
                )
              );
            }
            if (!isConnectionClosed) {
              isConnectionClosed = true;
              eventSource.close();
            }
          }
        } catch (error) {
          handleParsingError(error, event.data);
        }
      };

      eventSource.onerror = (error) => {
        const errorMessage = handleNetworkError(error);
        if (!isConnectionClosed) {
          isConnectionClosed = true;
          eventSource.close();
        }
        if (!streamedContent) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    content: errorMessage,
                    isLoading: false,
                    error: true,
                  }
                : msg
            )
          );
        }
      };

      eventSource.addEventListener("end", () => {
        if (!isConnectionClosed) {
          isConnectionClosed = true;
          eventSource.close();
        }
      });
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        ErrorType.API,
        ERROR_MESSAGES.API_EXHAUSTED
      );
      const aiMessage: Message = {
        id: generateId("ai-error-"),
        type: MessageType.AI,
        content: errorMessage,
        error: true,
        isLoading: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  return { messages, handleMessageSend };
};
