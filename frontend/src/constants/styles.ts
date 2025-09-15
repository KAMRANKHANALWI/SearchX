// Common styling patterns and reusable classes
export const STYLES = {
  // Layout and containers
  CONTAINER: {
    FULL_SCREEN: "relative h-screen w-full overflow-hidden",
    CENTERED: "flex items-center justify-center",
    MAIN_CONTENT: "mainContent absolute inset-0 z-10",
  },

  // Buttons
  BUTTON: {
    PRIMARY:
      "w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md",
    SECONDARY:
      "w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-md border border-gray-700 transition-colors duration-200 flex items-center justify-center",
    ICON: "text-gray-400 hover:text-white transition-colors",
    PROFILE:
      "rounded-full overflow-hidden border-2 border-gray-700 hover:border-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900",
  },

  // Text and typography
  TEXT: {
    TITLE_MAIN:
      "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-gray-400 via-zinc-300 to-gray-400 bg-clip-text text-transparent",
    DESCRIPTION:
      "text-sm italic sm:text-base md:text-lg text-center mb-4 sm:mb-6 transition-all bg-clip-text text-transparent animate-gradient",
    ERROR: "text-red-400 text-sm",
    SECONDARY: "text-gray-400 text-sm",
  },

  // Messages and bubbles
  MESSAGE: {
    BUBBLE_BASE:
      "max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-2xl px-4 py-3 shadow-lg text-xs sm:text-sm md:text-base lg:text-lg",
    USER_BUBBLE:
      "ml-auto bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-blue-400/30 backdrop-blur-lg",
    AI_BUBBLE:
      "bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 text-gray-100 border border-slate-600/40 backdrop-blur-lg shadow-xl",
    ERROR_BUBBLE:
      "bg-gradient-to-r from-red-600/90 via-red-500/90 to-red-700/90 text-white border border-red-400/50 backdrop-blur-lg",
  },

  // Modals and overlays
  MODAL: {
    OVERLAY:
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40",
    CONTAINER:
      "bg-black border-4 border-zinc-900 rounded-lg shadow-xl w-full max-w-md p-5 mx-4 my-4 sm:my-0 max-h-[90vh] overflow-y-auto",
  },

  // Input components
  INPUT: {
    BASE: "w-full relative mx-auto bg-white dark:bg-zinc-800 h-10 sm:h-11 md:h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
    FIELD:
      "w-full relative text-xs sm:text-sm md:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-3 sm:pl-4 md:pl-10 pr-16 sm:pr-20",
    SUBMIT_BUTTON:
      "absolute right-1.5 sm:right-2 top-1/2 z-5 -translate-y-1/2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center",
  },

  // Responsive layouts
  RESPONSIVE: {
    MESSAGE_SECTION:
      "relative w-screen max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8",
    INPUT_CONTAINER:
      "w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto px-2 sm:px-4",
    CHAT_HEIGHT:
      "h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem]",
  },

  // Utilities
  UTILS: {
    HIDE_SCROLLBAR: "hide-scrollbar",
    BACKDROP_BLUR: "backdrop-blur-md",
    GRADIENT_FADE:
      "bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm",
  },

  // Animations
  ANIMATION: {
    FADE_IN: "animate-fadeIn",
    SLIDE_UP: "animate-slideUp",
    GRADIENT: "animate-gradient",
  },
} as const;
