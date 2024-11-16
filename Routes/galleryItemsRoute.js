import express from "express";

import {
  createGalleryItems,
  deleteGalleryItems,
  getGalleryItems,
  getGalletyItemById,
  updateGalleryItem,
} from "../Controllers/galleryItemControllers.js";

//Creating galleryItem Router
const galleryItemRouter = express.Router();

galleryItemRouter.post("/", createGalleryItems);
galleryItemRouter.get("/", getGalleryItems);
galleryItemRouter.get("/:eventId", getGalletyItemById);
galleryItemRouter.delete("/:eventId", deleteGalleryItems);
galleryItemRouter.put("/:eventId", updateGalleryItem);

export default galleryItemRouter;
