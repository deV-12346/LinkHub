import './src/index.js';
import dotenv from "dotenv";
import connectDb from "./src/db/index.js";
import app from "./src/app.js";

dotenv.config();

connectDb().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});