import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "photos";

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

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

    const fileName = `${photoId}`;
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .download(fileName);

    if (error || !data) {
      res.status(404).json({ message: "Photo not found." });
      return;
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", data.type || "application/octet-stream");
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

    if (!supabase) {
      res.status(500).json({
        message:
          "Supabase storage is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.",
      });
      return;
    }

    const photoId = Date.now();
    const extension = file.originalname?.split(".").pop() || "jpg";
    const fileName = `${photoId}.${extension}`;

    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype || "image/jpeg",
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
