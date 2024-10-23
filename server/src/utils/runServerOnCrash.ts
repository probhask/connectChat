export const runServerOnCrash = () => {
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception", err);
  });
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", "reason:", reason);
  });
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
  });
};
