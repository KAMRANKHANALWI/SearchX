// Routes
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000",
  CHAT_ENDPOINT: "/chat",
  USER_MEMORY_ENDPOINT: "/user/memory",
} as const;

// UI Constants
export const UI_CONSTANTS = {
  PLACEHOLDER_ROTATION_INTERVAL: 3000,
  LOADER_ANIMATION_DELAY: 0.3,
  CONTENT_ANIMATION_DURATION: 1,
  MESSAGE_ANIMATION_DURATION: 0.3,
  TOOLTIP_ANIMATION_DURATION: 0.4,
} as const;

// Search Placeholders
export const SEARCH_PLACEHOLDERS = {
  WEB_SEARCH: [
    "Weather in Delhi?",
    "Google stock price",
    "Trending movies",
    "This week AI news",
    "Tech events India",
  ] as string[],
  DEEP_RESEARCH: [
    "Research AI trends",
    "Web dev best practices",
    "Quantum vs cryptography",
    "Future of renewables",
    "Climate change & farming",
  ] as string[],
};

// Error Messages
export const ERROR_MESSAGES = {
  SERVER_ERROR:
    "It's not you It's me 😅. I am facing some issues on my Server. Please try again later.",
  API_EXHAUSTED:
    "Apologies 😅, My API keys are exhausted.",
} as const;

// Search Stages
export const SEARCH_STAGES = {
  SEARCHING: "searching",
  READING: "reading",
  WRITING: "writing",
} as const;

// Deep Research Messages
export const DEEP_RESEARCH_MESSAGE = {
  DISABLED_TITLE:
    "Sorry about this 😅 This feature is currently disabled as it's been quite expensive for me. I'll either remove it or optimize it when it becomes manageable.",
  ALTERNATIVE_SUGGESTION:
    "Meanwhile, check out the open-source project that inspired this:",
  GITHUB_LINK: "https://github.com/assafelovic/gpt-researcher",
  GITHUB_TEXT: "👉 GPT Researcher GitHub Repo ↗",
} as const;
