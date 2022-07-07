/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})


const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}


module.exports = withPlugins([
  [
    withMDX, ({
      // Append the default value with md extensions
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    })
  ]
], nextConfig);

