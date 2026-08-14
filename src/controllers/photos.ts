import { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";

const candidateDirs = [
  process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : null,
  "/tmp/uploads",
  path.resolve(process.cwd(), "uploads"),
].filter(Boolean) as string[];

const getUploadDir = () => {
  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      return dir;
    } catch {
      // Try the next fallback directory if this one is not writable.
    }
  }

  return "/tmp/uploads";
};

const ensureUploadDir = () => getUploadDir();

const getPhotoId = (req: Request): number | null => {
  const rawId = Array.isArray(req.params.photoId)
    ? req.params.photoId[0]
    : req.params.photoId;

  const photoId = Number(rawId);
  return Number.isFinite(photoId) ? photoId : null;
};

const findUploadedPhoto = (photoId: number): string | null => {
  const resolvedDir = getUploadDir();

  if (!fs.existsSync(resolvedDir)) {
    return null;
  }

  const files = fs.readdirSync(resolvedDir);
  const matchingFile = files.find((fileName) =>
    fileName.startsWith(`${photoId}`),
  );

  return matchingFile ? path.join(resolvedDir, matchingFile) : null;
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
