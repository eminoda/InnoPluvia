import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

const BlogPage = ({ data }: { data: { allMdx: { nodes: { id: string; frontmatter: { slug: string; title: string; date: string } }[] } } }) => {
  return (
    <div>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/blog/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
        </article>
      ))}
    </div>
  );
};

export const query = graphql`
  query {
    allMdx(filter: { frontmatter: { title: { ne: null } } }) {
      nodes {
        frontmatter {
          title
          slug
        }
        id
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
export default BlogPage