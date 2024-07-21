import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

const Category = ({ list }: { list: String[] }) => {
  return (
    <div>
      {list.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
};

export default Category;
