import GalleryItem from "../Models/galleryItems.js";
import { isAdminValid } from "./userControllers.js";

//Creating gallery items
export function createGalleryItems(req, res) {
  const user = req.user;
  if (user == null) {
    res.status(404).json({
      message: "Unauthorized User! Please log in to create gallery items",
    });
    return;
  }
  if (user.type != "admin") {
    res.status(403).json({
      message: "Forbidden. You are not authorized to create gallery items",
    });
    return;
  }

  const galleryItem = req.body.item;
  const newGalleryItem = new GalleryItem(galleryItem);

  newGalleryItem
    .save()
    .then(() => {
      res.json({
        message: "Gallery Items saved successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "Gallery Items creation failed",
        error: error,
      });
    });
}

//viewing gallery items
export function getGalleryItems(req, res) {
  GalleryItem.find().then((ItemList) => {
    res.json({
      List: ItemList,
    });
  });
}

//Get one Gallery item
export function getGalletyItemById(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Forbidden",
    });
    return;
  }

  const eventId = req.params.eventId;
  GalleryItem.findOne({ eventId: eventId })
    .then((result) => {
      res.json({
        message: "Successfully loaded the event details",
        result: result,
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to load event details",
      });
    });
}

//Deleting gallery items
export function deleteGalleryItems(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Forbidden!",
    });
    return;
  }
  const id = req.params.eventId;
  GalleryItem.findOneAndDelete({ eventId: id })
    .then((result) => {
      res.json({
        message: "GalleryItem deleted successfully!",
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to delete the gallery item",
      });
    });
}
