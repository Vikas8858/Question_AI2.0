// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import aiRoutes from "./routes/ai.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/api/ai", aiRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// ✅ CORS config: sirf frontend domain allow hoga
app.use(cors({
  origin: "https://question-ai-2-frontend.vercel.app", // apna frontend url
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());
app.use("/api/ai", aiRoutes);

// ✅ for Vercel deployment: listen only if not in serverless env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
