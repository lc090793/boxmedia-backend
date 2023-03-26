import express from "express";

import * as dotenv from "dotenv";

import { router } from "./routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use((error,request,response, next)=>{
  return response.json({
    status:'Error',
    message:error.message,
  })
})

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
