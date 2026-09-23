# Crafted Journeys

check https://github.com/shahid-laskar/design-system-core.git
 Using the existing approved design system in this project, build the product detail page at /products/$productId.

    Do NOT redesign the global theme, colors, typography, or existing components.

    Reuse the canonical tokens, PageContainer, Eyebrow, and SectionHeading components.

    OBJECTIVE

    Create a product page that combines:

    - Emotional, restrained product storytelling

    - Transparent product information and craft origin

    - Effortless purchasing flow

    DESKTOP LAYOUT

    Two-column layout:

    - Left: Multi-image gallery with thumbnail selector

    - Right: Sticky product information and purchasing controls

    MOBILE LAYOUT

    Prioritize:

    1. Product imagery

    2. Title & value proposition

    3. Price & subtle availability indicator

    4. Variant selectors (colors / sizes / material)

    5. Primary Add to Bag CTA

    6. Delivery, packaging, and returns reassurance

    7. Product craft story and specifications (dimensions, care, materials)

    INCLUDE

    - Product title and short promise

    - Price (with optional compare-at price)

    - Color / variant picker

    - Quantity selector

    - Primary "Add to bag" button

    - Accordion or tabs for: Materials & Origin, Dimensions, Care Instructions, Delivery & Returns

    - "Our guarantee" reassurance notes

    - One restrained, complementary product recommendation ("Pairs well with")

    BUNDLE SECTION

    Show one optional complementary bundle with a clear bundle saving.

    Do not make upselling aggressive.

    Avoid:

    - Fake urgency banners

    - Countdown timers

    - Manipulative scarcity tickers

    - Aggressive promotional badges

    Use realistic mock product data matching the existing collection items (e.g. The Stillness Set, The Everyday Pair, First Forms Set).

    Do not build custom backend APIs or external checkout.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ac17c12b-4d7b-4f01-b992-65d086120a94).

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
