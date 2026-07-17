import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", initialValue: "Ines Burrell — Geopolitical Advisory" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "contactEmail", type: "string", initialValue: "info@inesburrell.com" }),
    defineField({ name: "bookingUrl", type: "url", description: "Cal.com booking link." }),
    defineField({ name: "substackUrl", type: "url", initialValue: "https://inesburrell.substack.com" }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({
      name: "announcement",
      type: "string",
      description: "Optional one-line site-wide announcement.",
    }),
  ],
});
