# Ai Mediacal Website

## Installation
Install `node.js` on your desktop.  
Run the dependency installation.
```bash
npm i
# or
yarn install
```
Then, copy `.template.env` as `.env` and change the config.  
Last, database migration
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [next-i18next](https://github.com/isaachinman/next-i18next) - a localization plugin for Next.js
- [Boostrap Grid](https://getbootstrap.com/docs/5.0/layout/grid/) - a general grid system

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Code of conduct

To improve the user experience of mobile:

Hover and related mouse animation should defined under `.no-touch` class.
```scss
/* wrong sample, it will presented to mobile and desktop */
button {
    background-color: #fff;
    &:hover {
        opacity: 1;
    }
}
/* correct sample */
button {
    background-color: #fff;
    .no-touch &:hover {
        opacity: 1;
    }
}
```