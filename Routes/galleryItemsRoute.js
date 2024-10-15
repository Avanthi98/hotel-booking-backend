import express from "express";

import { createGalleryItems,getGalleryItems } from "../Controllers/galleryItemControllers.js";

//Creating galleryItem Router
const galleryItemRouter=express.Router();

galleryItemRouter.post("/",createGalleryItems);
galleryItemRouter.get("/",getGalleryItems);

export default galleryItemRouter;

