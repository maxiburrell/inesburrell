import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headshot", type: "image", options: { hotspot: true } }),
    defineField({ name: "shortBio", type: "text", rows: 3, description: "Used in the article end-matter bio block." }),
    defineField({
      name: "sameAs",
      title: "Profiles (sameAs)",
      type: "array",
      of: [{ type: "url" }],
      description: "Substack, LinkedIn, Persuasion author page — used for structured data.",
    }),
  ],
});
