import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Fetch helper with tag-based revalidation. Content is cached until the
 * Sanity webhook (or a 60s fallback window) revalidates the "sanity" tag.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = ["sanity"],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags },
  });
}
