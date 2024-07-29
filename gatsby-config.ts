import type { GatsbyConfig } from "gatsby";
import path, { dirname } from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `InnoPluvia`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sass`,
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              disableBgImage: true,
              wrapperStyle: `height: "auto"`,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        // path: path.resolve(__dirname, "../ob-blogs/"),
        path: path.resolve(__dirname, "../../my_blogs/my_blogs/"),
        ignore: ["**/.obsidian", "**/.git", "**/Templates"],
        fastHash: true,
      },
    },
  ],
};

export default config;
