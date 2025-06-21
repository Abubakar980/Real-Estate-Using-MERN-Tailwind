import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectMongoDB from './db/db.js';
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.routes.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on PORT ${process.env.PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


/** 
 * ! 6:36:00
 * **/