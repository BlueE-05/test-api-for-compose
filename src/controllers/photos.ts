import { Request, Response } from "express";

const getPhotoId = (req: Request): number | null => {
  const rawId = Array.isArray(req.params.photoId)
    ? req.params.photoId[0]
    : req.params.photoId;

  const photoId = Number(rawId);
  return Number.isFinite(photoId) ? photoId : null;
};

export const PhotosController = {
  getPhoto(req: Request, res: Response): void {
    const photoId = getPhotoId(req);

    if (photoId === null) {
      res.status(400).json({ message: "Invalid photo id." });
      return;
    }

    res.status(200).json({
      success: true,
      photoId,
    });
  },

  createPhoto(req: Request, res: Response): void {
    const photoId = getPhotoId(req);

    if (photoId === null) {
      res.status(400).json({ message: "Invalid photo id." });
      return;
    }

    res.status(200).json({
      success: true,
      photoId,
    });
  },
};
