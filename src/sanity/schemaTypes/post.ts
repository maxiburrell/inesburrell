import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Essay",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the archive and in search results (max 200 characters).",
      validation: (rule) => rule.required().max(200),
      group: "content",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", type: "string" }),
      ],
      group: "content",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.min(1),
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
        {
          type: "object",
          name: "pullQuote",
          title: "Pull quote",
          fields: [
            defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Pull quote" }),
          },
        },
        { type: "object", name: "divider", title: "Divider", fields: [defineField({ name: "style", type: "string", hidden: true, initialValue: "line" })], preview: { prepare: () => ({ title: "· · ·", subtitle: "Divider" }) } },
      ],
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "originalSubstackUrl",
      title: "Original Substack URL",
      type: "url",
      description: "If this essay was first published on Liminal Lines.",
      group: "content",
    }),
    defineField({
      name: "seo",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "metaTitle", type: "string", description: "Overrides the essay title in search results (max 60 characters).", validation: (rule) => rule.max(60) }),
        defineField({ name: "metaDescription", type: "text", rows: 2, description: "Overrides the excerpt in search results (max 155 characters).", validation: (rule) => rule.max(155) }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "heroImage", date: "publishedAt" },
    prepare: ({ title, media, date }) => ({
      title,
      media,
      subtitle: date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Draft",
    }),
  },
});
