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

  const startingId = 100;
  GalleryItem.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1; //countDocuments() function will return the count of database records
      //So count variable will return the count

      const newGalleryItem = new GalleryItem({
        eventId: newId,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
      });

      newGalleryItem
        .save()
        .then((result) => {
          res.json({
            message: "Galery Event created successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Gallery Event creation failed",
            error: err,
          });
        });
    })
    .catch(() => {
      res.json({
        message:
          "Gallery event creation failed due to database connection failure",
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
//Update gallery Item
export function updateGalleryItem(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Forbidden!",
    });
    return;
  }
  const id = req.params.eventId;
  GalleryItem.updateOne({ eventId: id }, req.body)
    .then(() => {
      res.json({
        message: "Gallery Event updated successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to update the gallery event",
      });
    });
}
