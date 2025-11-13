import mdx from "@next/mdx";
import { withBotId } from 'botid/next/config';
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */


const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};



export default (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // 3. Conditional loading of dotenv for local dev only
    require('dotenv').config({ path: './.env.local' });
  }

  // 4. Apply all wrappers to the final config object, regardless of phase
  return withBotId(withMDX(nextConfig));
};
