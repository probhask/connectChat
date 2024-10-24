import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: $`{process.env.FRONTEND_URL}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};
