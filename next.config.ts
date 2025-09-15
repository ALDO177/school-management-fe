import type { NextConfig } from "next";

const nextConfig: NextConfig | any = {
  /* config options here */
   experimental: {
    runtime: "edge",
    authInterrupts: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true // skip linting
  }
  
  // serverActions: {
  //   trustedOrigins: [
  //     "https://jubilant-spoon-5wxv9wgrvvpf7p47-3000.app.github.dev",
  //     "http://localhost:3000"
  //   ]
  // }
};

export default nextConfig;
