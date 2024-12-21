import express from "express";
import {
  listProduct,
  addProduct,
  editProduct,
  removeProduct,
  getProductById,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove/:id", removeProduct);
productRouter.post("/edit/:id", editProduct);
productRouter.get("/list", listProduct);
productRouter.get("/:id", getProductById);

export default productRouter;
