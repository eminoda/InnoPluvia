import * as React from "react";
import { Link, graphql, navigate, useStaticQuery } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../../components/layout";
import Category from "../../components/category";

const BlogPage = ({ data, location, pageContext }: PageProps & { data: { categories: { distinct: String[] }; posts: { nodes: { frontmatter: { slug: String; title: String } }[] } } }) => {
  console.log(location, pageContext);



  return (
    <Layout>
      <p>blog 主页面</p>
      <Category list={data.categories.distinct} />
      <hr />
      {data.posts.nodes.map((item) => {
        return <div>{item.frontmatter.slug}</div>;
      })}
      <Link to="/blog/?page=1">1</Link>
      <Link to="/blog/?page=2">2</Link>
    </Layout>
  );
};

export const query = graphql`
  query {
    categories: allFile(filter: { extension: { eq: "md" }, relativeDirectory: { ne: "" } }) {
      distinct(field: { relativeDirectory: SELECT })
    }
    posts: allMdx(filter: { frontmatter: { slug: { nin: ["", null] } } }, limit: 2, skip: 0) {
      totalCount
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
export default BlogPage;
