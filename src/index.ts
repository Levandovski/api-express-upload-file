import express, { Request, Response } from "express";
import path from "path";
import multer from "multer";

const app = express();

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  console.log("aquii");
  res.send("Arquivo recebido!");
});

app.listen(8080, () => {
  console.log("Server is running!");
});
