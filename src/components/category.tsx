import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

type Node = {
  name: String;
  children: Node[];
};
const Category = ({ list }: { list: String[] }) => {
  const cTree: Node[] = [];

  const cDeeps: { parentName: String; name: String }[][] = [];
  for (const item of list) {
    const cArr = item.split("/");
    cArr.forEach((name, index) => {
      if (!cDeeps[index]) {
        cDeeps[index] = [];
      }
      if (!cDeeps[index].find((_) => _.name === name)) {
        cDeeps[index].push({
          parentName: index === 0 ? "" : cArr[index - 1],
          name,
        });
      }
    });
  }

  for (let i = cDeeps.length - 1; i >= 0; i--) {
    const children = cDeeps[i].map((item) => {
      return {
        name: item.name,
        children: [],
      };
    });
  }

  const getChildren = (deep: number, parentName: String): Node[] => {
    const drr = cDeeps[deep];
    return drr
      .filter((item) => item.parentName === parentName)
      .map((item) => {
        return {
          name: item.name,
          children: deep + 1 < cDeeps.length ? getChildren(deep + 1, item.name) : [],
        };
      });
  };

  cDeeps.forEach((dArr, index) => {
    dArr.forEach(({ name, parentName }) => {
      if (!parentName) {
        cTree.push({
          name,
          children: getChildren(1, name),
        });
      }
    });
  });

  console.log(cTree);

  const TreeNodes = ({ children, name }: Node) => {
    return (
      <ul>
        <li>
          {name}
          {children.map((item) => {
            return TreeNodes(item);
          })}
        </li>
      </ul>
    );
  };
  return (
    <div>
      {cTree.map((node) => {
        return TreeNodes(node);
      })}
    </div>
  );
};

export default Category;
