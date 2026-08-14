import { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";

const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : "/tmp/uploads";

const getUploadDir = () => {
  const resolvedDir = process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : "/tmp/uploads";

  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  return resolvedDir;
};

const ensureUploadDir = () => {
  const dir = getUploadDir();
  return dir;
};

const getPhotoId = (req: Request): number | null => {
  const rawId = Array.isArray(req.params.photoId)
    ? req.params.photoId[0]
    : req.params.photoId;

  const photoId = Number(rawId);
  return Number.isFinite(photoId) ? photoId : null;
};

const findUploadedPhoto = (photoId: number): string | null => {
  const dir = getUploadDir();

  if (!fs.existsSync(dir)) {
    return null;
  }

  const files = fs.readdirSync(dir);
  const matchingFile = files.find((fileName) =>
    fileName.startsWith(`${photoId}`),
  );

  return matchingFile ? path.join(dir, matchingFile) : null;
};

export const PhotosController = {
  getPhoto(req: Request, res: Response): void {
    const photoId = getPhotoId(req);

    if (photoId === null) {
      res.status(400).json({ message: "Invalid photo id." });
      return;
    }

    const filePath = findUploadedPhoto(photoId);

    if (!filePath) {
      res.status(404).json({ message: "Photo not found." });
      return;
    }

    res.sendFile(filePath);
  },

  createPhoto(req: Request, res: Response): void {
    const dir = ensureUploadDir();

    const files = (req as any).files ?? {};
    const file = files.file?.[0] ?? files.photo?.[0] ?? (req as any).file;

    if (!file) {
      res.status(400).json({
        message:
          "No image file uploaded. Send a multipart/form-data file with the field 'file' or 'photo'.",
      });
      return;
    }

    const photoId = Date.now();
    const extension = path.extname(file.originalname) || ".jpg";
    const destinationPath = path.join(dir, `${photoId}${extension}`);

    fs.writeFileSync(destinationPath, file.buffer);

    res.status(200).json({
      success: true,
      photoId,
    });
  },
};
