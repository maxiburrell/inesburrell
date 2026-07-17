import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 * URL https://<site>/api/revalidate, trigger on create/update/delete,
 * secret matching SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    revalidateTag("sanity", "max");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
