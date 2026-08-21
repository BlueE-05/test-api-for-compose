import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY;

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const requireSupabase = () => {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.",
    );
  }

  return supabase;
};

export const throwSupabaseError = (error: {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}): never => {
  const details = [error.code, error.details, error.hint]
    .filter(Boolean)
    .join(" | ");
  throw new Error(
    `Supabase error: ${error.message ?? "Unknown database error"}${details ? ` (${details})` : ""}`,
  );
};
