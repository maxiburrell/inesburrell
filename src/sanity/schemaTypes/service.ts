import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required(), group: "content" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "strapline",
      type: "string",
      description: "One line under the title.",
      group: "content",
    }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })], group: "content" }),
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
        },
        { type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] },
      ],
      group: "content",
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        },
      ],
      group: "content",
    }),
    defineField({
      name: "seo",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "metaTitle", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "metaDescription", type: "text", rows: 2, validation: (rule) => rule.max(155) }),
      ],
    }),
  ],
});
