/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "thumbs.dreamstime.com",
      "www.industrialempathy.com",
    ],
  },

  env: {
    DATABASE_URL:
      "mongodb+srv://eknumbersauda:eknumber12345@cluster0.zibra8x.mongodb.net/eknumbersauda",
    JWT_SECRET: "DrduNe1fh6goHN/L1^$%*&@^kLIytOIpSQS4a1",
    PATH: "http://localhost:3000",
  },
  async headers() {
    return [
      {
        // MATCHING ALL API ROUTES
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
