/*
* @type {import('next').NextConfig} 
*/

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// module.exports = withPWA({
//   reactStrictMode: false,
//   async rewrites() {
//     return [
//       {
//         source: '/myprojects/edit-project/:slug',
//         destination: '/myprojects/edit-project/:slug',
//       },
//       {
//         source: '/myblogs/edit-blog/:slug',
//         destination: '/myblogs/edit-blog/:slug',
//       },
//       {
//           source: '/myproperties/edit-property/:slug',
//           destination: '/myproperties/edit-property/:slug',
//       },
//       {
//         source: '/agents/edit-agent/:id(\\d{1,})',
//         destination: '/agents/edit-agent/:id',
//       },
//       {
//         source: '/agents/profile/:id(\\d{1,})',
//         destination: '/agents/profile/:id',
//       },
//       {
//         source: '/:path*',
//         destination: 'http://homesandbeyond.net/:path*',
//       },
//       {
//         source: '/:path*',
//         destination: 'https://httpbin.org/post/:path*',
//       },
//     ]
//   },
//   env: {
//     API_URL: "http://localhost:4000/api",
//     BACKEND: "http://homesandbeyond.net", //localhost
//     UPLOAD: "https://httpbin.org/post"
  
//   },
// });





module.exports = withPWA({
  reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/myprojects/edit-project/:slug',
          destination: '/myprojects/edit-project/:slug',
        },
        {
          source: '/myblogs/edit-blog/:slug',
          destination: '/myblogs/edit-blog/:slug',
        },
        {
          source: '/myproperties/edit-property/:slug',
          destination: '/myproperties/edit-property/:slug',
        },
       {
        source: '/agents/edit-agent/:id(\\d{1,})',
        destination: '/agents/edit-agent/:id',
       },
       {
         source: '/agents/profile/:id(\\d{1,})',
         destination: '/agents/profile/:id',
       },
       {
         source: '/:path*',
         destination: 'http://localhost:4100/:path*',
       },
       {
        source: '/:path*',
        destination: 'https://httpbin.org/post/:path*',
      },
     ]
   },
   env: {
     API_URL: "http://localhost:4000/api",
     BACKEND: "http://localhost:4100", //localhost
     UPLOAD: "https://httpbin.org/post"
   },
   
});