import type { NextConfig } from "next";

const config: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  typedRoutes: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default config;
