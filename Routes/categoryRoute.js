import express from "express"
import {createCategory,DeleteCategory,getCategoryByName,getCategoryList, updateCategory} from "../Controllers/categoryController.js"

const categoryRouter=express.Router();

//Category Routes for all functions
categoryRouter.post("/",createCategory);
categoryRouter.get("/",getCategoryList);
categoryRouter.delete("/:name",DeleteCategory);//If you want to delete something by using one parameter,so you can use this type of API
categoryRouter.get("/:name",getCategoryByName);//If you want to get something by using one parameter, you can use this type of API
categoryRouter.put("/:name",updateCategory);//If you want to update something by using one parameter,so you can use this type of API


export default categoryRouter;