import { z } from "zod";

/**
 * Zod schema to validate student admissions inquiry inputs.
 */
export const admissionsInquirySchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .trim(),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  grade: z.string().min(1, "Please select an applying grade"),
  stream: z.string().optional().nullable(),
  previousSchool: z
    .string()
    .max(100, "Previous school name must not exceed 100 characters")
    .optional()
    .nullable(),
  guardianName: z
    .string()
    .min(2, "Guardian name must be at least 2 characters")
    .max(100, "Guardian name must not exceed 100 characters")
    .trim(),
  guardianPhone: z
    .string()
    .regex(/^\+?[\d-\s]{7,15}$/, "Invalid phone number format. Must be 7-15 digits"),
  email: z.string().email("Invalid email address format").trim(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters")
    .trim(),
  notes: z
    .string()
    .max(500, "Notes must not exceed 500 characters")
    .optional()
    .nullable(),
});

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

export const BANNED_EXTENSIONS = [
  ".php",
  ".phtml",
  ".php3",
  ".php4",
  ".php5",
  ".phps",
  ".js",
  ".ts",
  ".html",
  ".htm",
  ".exe",
  ".sh",
  ".bat",
  ".cmd",
  ".msi",
  ".dll",
  ".com",
  ".scr",
  ".vbs",
  ".sys",
  ".jar",
];

/**
 * Validates document buffers by checking their Magic Number signatures.
 * Blocks spoofed extensions and ensures only standard PDFs or images are allowed.
 */
export function validateFileHeader(buffer: Buffer): boolean {
  if (buffer.length < 4) {
    return false;
  }

  const hex = buffer.toString("hex", 0, 4).toUpperCase();

  // 1. PDF: %PDF (25 50 44 46)
  if (hex.startsWith("25504446")) return true;

  // 2. JPEG: FF D8 FF
  if (hex.startsWith("FFD8FF")) return true;

  // 3. PNG: 89 50 4E 47
  if (hex.startsWith("89504E47")) return true;

  // 4. GIF: GIF8 (47 49 46 38)
  if (hex.startsWith("47494638")) return true;

  // 5. ZIP / DOCX / XLSX (50 4B 03 04)
  if (hex.startsWith("504B0304")) return true;

  return false;
}
