import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export → out/, served by nginx (see Dockerfile).
  output: "export",

  // Pin the workspace root to this project. Without it Next walks up looking for
  // a lockfile, finds a stray one in the home directory, and Turbopack ends up
  // watching every file under it.
  turbopack: {
    root: __dirname,
  },

  // No server at runtime, so there is nothing to optimise images on the fly.
  images: {
    unoptimized: true,
  },

  // NOTE: headers()/redirects()/rewrites() do nothing under output: "export" —
  // there is no server to run them. Security and cache headers live in
  // nginx.conf, which is what actually serves the site in production.
};

export default nextConfig;
