import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode, CreatePagesArgs } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<{ allMdx: { edges: { node: { frontmatter: { slug } } }[] } }>(
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
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  if (result.data) {
    // Create blog-list pages
    const posts = result.data.allMdx.edges;
    const postsPerPage = 1;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: `/blogs/${i + 1}`,
        component: path.resolve("./src/templates/blog-list-template.tsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  }
};

// export const onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `Mdx`) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });
//   }
// };
