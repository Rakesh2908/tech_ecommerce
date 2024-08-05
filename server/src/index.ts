import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productRouter);

mongoose.connect(
  "mongodb+srv://grrsm2908:Qaz1234@ecommerce.ozsrrhi.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(3001, () => console.log("Server started on PORT 3001"));