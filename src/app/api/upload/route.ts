// import { put } from '@vercel/blob';
// import { NextResponse } from "next/server";
// import { verifySession } from "@/lib/session";
// import { env } from "@/lib/env";

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     // Verify user is authenticated
//     await verifySession();

//     // Handle the upload
//     const response = await put(file.name, file, {
//       access: "public",
//       token: env.BLOB_READ_WRITE_TOKEN,
//     });

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return NextResponse.json({ error: "خطا در آپلود فایل" }, { status: 500 });
//   }
// }
