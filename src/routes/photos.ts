import { Router } from "express";
import { PhotosController } from "../controllers/photos";

const router = Router();

router.get("/:photoId", PhotosController.getPhoto);
router.post("/:photoId", PhotosController.createPhoto);

export default router;
