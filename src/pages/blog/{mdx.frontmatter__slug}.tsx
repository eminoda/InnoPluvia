import * as React from "react";
import { graphql } from "gatsby";
import "./post.scss"

type MdxType = {
  frontmatter: {
    title: String;
    date: String;
  };
};

const BlogPost = ({ data, children }: { data: { mdx: MdxType }; children: React.ReactNode }) => {
  return (
    <div>
      <div>{data.mdx.frontmatter.title}</div>
      <p>{data.mdx.frontmatter.date}</p>
      <div id="preview">{children}</div>
    </div>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPost;
