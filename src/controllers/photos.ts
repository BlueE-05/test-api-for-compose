import { Request, Response } from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_SECRET_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "photos";

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/heic": "heic",
  "image/heif": "heif",
  "image/avif": "avif",
};

const SAFE_EXTENSIONS = new Set(Object.values(MIME_TO_EXTENSION));

const getSafeImageExtension = (file: any): string => {
  const mimeType =
    typeof file?.mimetype === "string" ? file.mimetype.toLowerCase() : "";
  const extensionFromMime = MIME_TO_EXTENSION[mimeType];

  if (extensionFromMime) {
    return extensionFromMime;
  }

  const originalName =
    typeof file?.originalname === "string" ? file.originalname : "";
  const originalNameParts = originalName.toLowerCase().split(".");
  const candidateExtension =
    originalNameParts.length > 1 ? originalNameParts.pop() : undefined;

  if (candidateExtension && SAFE_EXTENSIONS.has(candidateExtension)) {
    return candidateExtension;
  }

  return "jpg";
};

const getPhotoId = (req: Request): number | null => {
  const rawId = Array.isArray(req.params.photoId)
    ? req.params.photoId[0]
    : req.params.photoId;

  const photoId = Number(rawId);
  return Number.isFinite(photoId) ? photoId : null;
};

export const PhotosController = {
  async getPhoto(req: Request, res: Response): Promise<void> {
    const photoId = getPhotoId(req);

    if (photoId === null) {
      res.status(400).json({ message: "Invalid photo id." });
      return;
    }

    if (!supabase) {
      res.status(500).json({
        message:
          "Supabase storage is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.",
      });
      return;
    }

    const candidateNames = [
      `${photoId}`,
      `${photoId}.jpg`,
      `${photoId}.jpeg`,
      `${photoId}.png`,
      `${photoId}.webp`,
      `${photoId}.gif`,
      `${photoId}.bmp`,
      `${photoId}.tiff`,
      `${photoId}.heic`,
      `${photoId}.heif`,
      `${photoId}.avif`,
    ];

    let data: Blob | null = null;
    let contentType = "application/octet-stream";

    for (const fileName of candidateNames) {
      const { data: downloaded, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .download(fileName);

      if (!error && downloaded) {
        data = downloaded;
        contentType = downloaded.type || contentType;
        break;
      }
    }

    if (!data) {
      res.status(404).json({ message: "Photo not found." });
      return;
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", contentType);
    res.status(200).send(buffer);
  },

  async createPhoto(req: Request, res: Response): Promise<void> {
    const files = (req as any).files ?? {};
    const file = files.file?.[0] ?? files.photo?.[0] ?? (req as any).file;

    if (!file) {
      res.status(400).json({
        message:
          "No image file uploaded. Send a multipart/form-data file with the field 'file' or 'photo'.",
      });
      return;
    }

    if (!Buffer.isBuffer(file.buffer) || file.buffer.length === 0) {
      res.status(400).json({
        message: "Invalid uploaded file. Expected a non-empty image buffer.",
      });
      return;
    }

    const mimeType =
      typeof file.mimetype === "string" ? file.mimetype.toLowerCase() : "";

    if (!mimeType.startsWith("image/")) {
      res.status(400).json({
        message: "Invalid file type. Only image uploads are allowed.",
      });
      return;
    }

    if (!supabase) {
      res.status(500).json({
        message:
          "Supabase storage is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.",
      });
      return;
    }

    const photoId = Date.now();
    const extension = getSafeImageExtension(file);
    const fileName = `${photoId}.${extension}`;

    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(fileName, file.buffer, {
        contentType: mimeType || "image/jpeg",
        upsert: false,
      });

    if (error) {
      res.status(500).json({ message: error.message });
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(fileName);

    res.status(200).json({
      success: true,
      photoId,
      url: publicUrlData.publicUrl,
    });
  },
};
