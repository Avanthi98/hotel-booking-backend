import express from "express"
import {createCategory,DeleteCategory,getCategoryByName,getCategoryList} from "../Controllers/categoryController.js"

const categoryRouter=express.Router();

//Category Routes for all functions
categoryRouter.post("/",createCategory);
categoryRouter.get("/",getCategoryList);
//If you want to delete something by using one parameter,so you can use this type of API
categoryRouter.delete("/:name",DeleteCategory)
categoryRouter.get("/:name",getCategoryByName);


export default categoryRouter;