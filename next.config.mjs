/** @type {import('next').NextConfig} */
import withPlugins from 'next-compose-plugins';
import remarkGfm from 'remark-gfm'
import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm
    ],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
})


const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}


export default withPlugins([
  [
    withMDX, ({
      // Append the default value with md extensions
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    })
  ]
], nextConfig);

