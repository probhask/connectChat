import React, { createContext, useCallback, useContext, useState } from "react";

type MessageContextType = {
  selectedMessageIds: string[];
  addSelectedMessage: (messageId: string) => void;
  removeSelectedMessage: (messageId: string) => void;
  clearAllSelectedMessage: () => void;
};

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

export const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  const addSelectedMessage = useCallback((messageId: string) => {
    setSelectedMessageIds((prev) =>
      prev.includes(messageId) ? prev : [...prev, messageId]
    );
  }, []);
  const removeSelectedMessage = useCallback((messageId: string) => {
    setSelectedMessageIds((prev) => prev.filter((msg) => msg !== messageId));
  }, []);
  const clearAllSelectedMessage = useCallback(() => {
    setSelectedMessageIds([]);
  }, []);

  const values = {
    selectedMessageIds,
    addSelectedMessage,
    removeSelectedMessage,
    clearAllSelectedMessage,
  };

  return (
    <MessageContext.Provider value={values}>{children}</MessageContext.Provider>
  );
};

const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      "useMessageContext hook must be used within MessageContextProvider"
    );
  }
  return context;
};

export default useMessageContext;
