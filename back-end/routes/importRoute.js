import express from "express";
import {
    addImport, listImport
} from "../controllers/importController.js";
import upload from "../middleware/multer.js";
const importRouter = express.Router();

importRouter.post(
  "/add",
  upload.single('file1'),
  addImport
);
importRouter.get("/list", listImport);
export default importRouter;