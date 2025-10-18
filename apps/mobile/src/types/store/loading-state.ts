type LoadingMessages = {
  messages: string[];
};

type LoadingState = {
  loadingInfo: { id: string; messages: string[] } | null;
  isVisible: boolean;
  show: (options: LoadingMessages) => string;
  hide: () => void;
};

export type { LoadingMessages, LoadingState };
