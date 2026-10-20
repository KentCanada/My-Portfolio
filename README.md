# My Portfolio

A personal portfolio built with JavaScript, Next.js App Router, and CSS Modules.
The Coffee Shop Catalog remains a separate project; this site only describes it
in a portfolio card.

## Run locally

Install the dependencies once, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. To check
the production build, run `npm run build`; to lint the project, run
`npm run lint`.

## Personalize the placeholders

- In `app/page.jsx`, update the `profile` values for your name, email, GitHub,
  and LinkedIn.
- Update the Coffee Shop Catalog project's `url` when a real demo is available.
  It is intentionally blank; no deployed URL is assumed.
- To add a screenshot, put the image in `public` and set the project's `image`
  to its public path, for example `/coffee-shop-catalog.png`. The image
  placeholder will be replaced automatically.
- Update the page title and description in `app/layout.jsx`.
