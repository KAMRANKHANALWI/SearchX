// Core Message Types
export enum MessageType {
  USER = "user",
  AI = "ai",
}

export interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
  deepResearch?: boolean;
  error?: boolean;
}

// Component Props Types
export interface InputBoxProps {
  onMessageSend?: (message: string) => void;
  onDeepResearchToggle?: (enabled: boolean) => void;
}

export interface MessageSectionProps {
  messages?: Message[];
  onMessageCountChange?: (len: number) => void;
}

export interface CommonLayoutProps {
  children: React.ReactNode;
  showLoader?: boolean;
  onLoaderFinished?: () => void;
}

export interface SearchStagesProps {
  searchInfo: SearchInfo;
}

// Auth Types
export interface AuthCheckProps {
  children: React.ReactNode;
}

// Placeholder Input Types
export interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
