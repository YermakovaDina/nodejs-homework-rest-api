import express from "express";
import logger from "morgan";
import cors from "cors";

// пишем всегда расширение js, но мы установили флаг в package.json
// import contactsRouter from "./routes/api/contacts.js"
import contactsRouter from "./routes/api/contacts";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: false })); // forms

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
