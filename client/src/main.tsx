import "./index.css";

import { ChatAppContextProvider } from "./context";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "@components/ErrorBoundary";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import chatAppStore from "./store";
import routes from "@routes/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Suspense fallback={"loading chat app"}>
    <ErrorBoundary>
      <Provider store={chatAppStore}>
        <ChatAppContextProvider>
          <CssBaseline />
          <RouterProvider router={routes} />
        </ChatAppContextProvider>
      </Provider>
    </ErrorBoundary>
  </Suspense>

  // </React.StrictMode>
);
