import path from "path";

import { GatsbyNode, CreatePagesArgs, graphql } from "gatsby";

const categoriesQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<{ allFile: { distinct: string[] } }>(
    `
      {
        allFile(filter: { extension: { eq: "md" }, relativeDirectory: { ne: "" } }) {
          distinct(field: { relativeDirectory: SELECT })
        }
      }
    `
  );
  return result?.data?.allFile?.distinct || [];
};

const postPaginationQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<{ allMdx: { edges: { node: { frontmatter: { slug: String } } }[] } }>(
    `
      {
        allMdx(limit: 1000, filter: { frontmatter: { slug: { nin: ["", null] } } }) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `
  );
  return result?.data?.allMdx.edges || [];
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const posts = await postPaginationQuery(graphql);
  const categories = await categoriesQuery(graphql);

  Array.from({ length: Math.ceil(posts.length / 2) }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blogs` : `/blogs/${i + 1}`,
      component: path.resolve("src/templates/blog-list-template.tsx"),
      context: {
        limit: 2,
        skip: i * 2,
        size: 2,
        currentPage: i + 1,
        categories,
      },
    });
  });
};
