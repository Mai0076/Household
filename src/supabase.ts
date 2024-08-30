import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database

export const supabase = createClient(
  "https://hlhbehlnpcmzgojjghdt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsaGJlaGxucGNtemdvampnaGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2Mzc0NDEsImV4cCI6MjA0MDIxMzQ0MX0.qsRva-EihBEpFqi8lKTyHHluoGcxAkhJaArQqXtwVu4"
);
