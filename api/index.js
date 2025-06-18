import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from '../db/db.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json())
connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on PORT ${process.env.PORT}`);
});


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

/**
 
* ! 1:22 continue

**/