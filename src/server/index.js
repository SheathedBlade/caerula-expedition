import cors from "cors";
import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.use(cors);

app.get("/message", (_, res) => res.send({ info: "BRUH" }));

ViteExpress.listen(app, 5173, () =>
  console.log(`Server is listening on 5173...`)
);
