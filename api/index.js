import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from '../db/db.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();
connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on PORT ${process.env.PORT}`);
});


app.use("/api/user", userRouter)


/**
 
* ! 1:03 continue

**/