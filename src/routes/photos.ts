import { Router } from "express";
import multer from "multer";
import { PhotosController } from "../controllers/photos";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const router = Router();

router.get("/:photoId", PhotosController.getPhoto);
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  PhotosController.createPhoto,
);

export default router;
