import { Socket, io } from "socket.io-client";
import { createContext, useContext, useEffect, useMemo } from "react";

import { useChatAppSelector } from "@store/hooks";

type SocketContextType = {
  socket: Socket;
};

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const user = useChatAppSelector((store) => store.auth);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected", socket.id);
      if (user?.accessToken) {
        socket.emit("authenticate", user.accessToken);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocketContext hook must be used within SocketContextProvider"
    );
  }
  return context;
};

export default useSocketContext;
