import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
        {
            // Matching all api paths"
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "http://localhost:5173" }, // Replace with your actual origin
              { key: "Access-Control-Allow-Methods", value: "GET,POST" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, name " },
            ],
          }
    ]
}

};

export default nextConfig;
