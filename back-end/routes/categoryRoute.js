import express from "express";
import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId,
    getSubCategoriesByCategoryName
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// category
categoryRouter.post("/add", addCategory);
categoryRouter.post("/remove/:id", deleteCategory);
categoryRouter.post("/edit/:id", editCategory);
categoryRouter.get("/list", getCategories);
categoryRouter.get("/:id", getCategoryById);

// subcategory
categoryRouter.post("/subadd", addSubCategory);
categoryRouter.post("/subremove/:id", deleteSubCategory);
categoryRouter.post("/subedit/:id", editSubCategory);
categoryRouter.get("/sub/:id", getSubCategoriesByCategoryId);
categoryRouter.get("/subname/:name", getSubCategoriesByCategoryName);

export default categoryRouter;