import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "@/components/layout";
import Category from "@/components/category";

type Props = {
  data: {
    posts: {
      edges: { node: { frontmatter: { slug: String; title: String } } }[];
    };
  };
  pageContext: {
    categories: String[];
  };
} & PageProps;

const BlogList = (props: Props) => {
  console.log(props);
  const posts = props.data.posts.edges;
  const { categories } = props.pageContext;
  return (
    <Layout>
      {/* 分类 */}
      <Category list={categories} />
      {/* 列表 */}
      <div className="grow max-w-3xl flex flex-col space-y-10">
        {posts.map(({ node }, index) => {
          const { title, slug } = node.frontmatter;
          return (
            <div className="rounded-md shadow-lg shadow-slate-200 px-6 pt-6 pb-4 bg-white">
              <Link className="text-2xl font-bold" to={`/blog/${slug}`}>
                {title}
              </Link>
              <div className="text-base text-slate-400 my-2.5">2023-8-6 13:14:55</div>
              <div className="text-base ">
                做梦也不会想到，前端开发里最意会的 css 居然能公式化出来。简简单单的 flex justify-between 就能代替原来书写多行的样式。你知道：text-cyan-700 text-2xl font-bold tracking-widest
                什么意思吗？
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
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
