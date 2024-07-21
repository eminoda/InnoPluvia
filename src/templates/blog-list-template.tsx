import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/layout";
import Category from "../components/category";

type BlogListType = {
  categories: { distinct: String[] };
  posts: {
    edges: { node: { frontmatter: { slug: String; title: String } } }[];
  };
};

const BlogList = ({ data }: { data: BlogListType }) => {
  const posts = data.posts.edges;
  return (
    <Layout>
      {/* 分类 */}
      <Category list={data.categories.distinct} />
      {/* 列表 */}
      {posts.map(({ node }, index) => {
        const title = node.frontmatter.title || node.frontmatter.slug;
        return <div key={index}>{title}</div>;
      })}
    </Layout>
  );
};

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    categories: allFile(filter: { extension: { eq: "md" }, relativeDirectory: { ne: "" } }) {
      distinct(field: { relativeDirectory: SELECT })
    }
    posts: allMdx(filter: { frontmatter: { slug: { nin: ["", null] } } }, limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;

export default BlogList;
