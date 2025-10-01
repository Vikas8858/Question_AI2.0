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

// CORS: sirf frontend URL allow karo
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://question-ai-2-frontend.vercel.app"
}));

app.use(bodyParser.json());
app.use("/api/ai", aiRoutes);

// Vercel port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
