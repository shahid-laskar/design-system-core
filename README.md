# Design System Core

The visual direction is approved. check https://github.com/shahid-laskar/haven-home-goods-build.git

Now freeze the current design language as the product's canonical design system.

Do NOT redesign the visual identity.

Document and centralize the current:

- colors

- typography

- spacing

- radii

- borders

- shadows

- component variants

- responsive breakpoints

- button styles

- card styles

- input styles

- navigation styles

- animation rules

Create or update a single reusable design-token source.

Refactor any duplicated values into shared tokens/components.

IMPORTANT:

From this point forward, every new page must reuse this design system.

Do not invent a new visual language for individual pages.

Do not add new features.

Do not redesign existing screens.

Do not add backend integrations.

Only improve consistency and make the current design system reusable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cebf015f-beb5-4135-a390-04c71d33ed6f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
