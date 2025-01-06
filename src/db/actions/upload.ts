"use server";

import { put, del } from "@vercel/blob";

interface UploadResult {
  url: string;
  success: boolean;
  error?: string;
}

export async function uploadFile(
  file: File,
  options?: {
    oldUrl?: string | null;
    maxSize?: number;
    accept?: string;
  }
): Promise<UploadResult> {
  try {
    const {
      oldUrl,
      maxSize = 5 * 1024 * 1024,
      accept = "image/*",
    } = options || {};

    // Validate file
    if (maxSize && file.size > maxSize) {
      return {
        url: "",
        success: false,
        error: `File size must be less than ${Math.floor(
          maxSize / 1024 / 1024
        )}MB`,
      };
    }

    if (accept && !file.type.startsWith(accept.split("/")[0])) {
      return {
        url: "",
        success: false,
        error: "Invalid file type",
      };
    }

    // Delete old file if exists
    if (oldUrl) {
      try {
        const oldFileUrl = new URL(oldUrl);
        const pathname = oldFileUrl.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
        await del(filename, {
          token: process.env.BLOB_READ_WRITE_TOKEN!,
        });
      } catch (error) {
        console.error("Error deleting old file:", error);
      }
    }

    // Upload new file
    const uniqueFilename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}${file.name.substring(file.name.lastIndexOf("."))}`;
    const blob = await put(uniqueFilename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return {
      url: blob.url,
      success: true,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      url: "",
      success: false,
      error: "Failed to upload file",
    };
  }
}

export async function deleteFile(url: string): Promise<boolean> {
  try {
    const fileUrl = new URL(url);
    const pathname = fileUrl.pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
    await del(filename, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}
