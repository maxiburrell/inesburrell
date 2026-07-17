"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "inesburrell",
  title: "Ines Burrell — Website",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("post").title("Essays"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("service").title("Service pages"),
            S.divider(),
            S.listItem()
              .title("Author")
              .child(S.editor().schemaType("author").documentId("author-ines")),
            S.listItem()
              .title("Site settings")
              .child(S.editor().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
