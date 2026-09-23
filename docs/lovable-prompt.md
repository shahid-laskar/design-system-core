# LOVABLE UI/UX BUILD — CREDIT-OPTIMIZED PROMPTS

## IMPORTANT EXECUTION RULE

Run these prompts sequentially.

Never combine multiple stages into one request.

After each generation:

1. Inspect the result visually on mobile and desktop.
2. Do not immediately regenerate.
3. Fix tiny issues using Lovable Visual Edits where possible.
4. Only use the next AI prompt when the current structural objective is satisfactory.
5. Never redesign the entire application because of one weak component.

The existing design research is a reference, not a mandatory visual specification.

---

# PROMPT 1 — CREATIVE DIRECTION + DESIGN SYSTEM + GLOBAL SHELL

```text
You are the creative director, product designer and frontend design engineer for a new premium Muslim family lifestyle brand.

I deliberately do NOT want to give you a predefined color palette, typography pairing or visual theme.

I want you to make the visual-design decisions.

PROJECT

We are building a modern Muslim family lifestyle ecosystem.

It will eventually combine:
- thoughtfully curated home/lifestyle products
- modest essentials
- children's products
- curated bundles
- editorial content
- digital resources
- a future family-routine/productivity experience

The physical and digital experiences should feel like one brand.

CORE CUSTOMER

Modern Muslim households, especially:
- young married couples
- Muslim parents
- families with young children
- working Muslim professionals
- digitally native Muslim households

BRAND IDEA

This should feel like entering a peaceful, beautifully considered Muslim home.

The emotional qualities should be:

- calm
- warm
- intentional
- refined
- contemporary
- trustworthy
- human
- culturally aware
- quietly premium

IMPORTANT DESIGN DIRECTION

Create a distinctly contemporary Islamic lifestyle aesthetic.

Do NOT make it look like:
- Amazon
- a generic Shopify theme
- a discount marketplace
- a SaaS dashboard
- a generic luxury fashion website
- a stereotypical Islamic store

Avoid:
- excessive gold
- mosque silhouettes
- crescent-moon decoration everywhere
- ornamental Islamic patterns used without purpose
- oversized SALE banners
- fake urgency
- aggressive promotional badges
- excessive rounded cards
- excessive gradients
- glassmorphism everywhere
- excessive animations
- clutter

The design should communicate Islamic identity through:
- composition
- photography
- typography
- restraint
- materiality
- editorial storytelling
- thoughtful language

rather than through decorative clichés.

CREATIVE FREEDOM

You are responsible for deciding:
- color palette
- typography pairing
- visual hierarchy
- border/radius language
- card treatment
- imagery treatment
- button style
- surface treatment
- navigation treatment
- spacing rhythm
- interaction style

Make ONE strong coherent design direction.
Do not create three themes.
Do not ask me which theme I prefer.
Make the decision yourself.

UX REQUIREMENTS

The design must remain highly usable.

The interface should be:
- mobile-first
- fast to understand
- accessible
- easy to browse
- easy to purchase from
- comfortable to read
- visually calm without becoming low-conversion

Minimalism must not hide:
- product name
- price
- variants
- add-to-cart action
- shipping information
- key trust information

BUILD ONLY

Do NOT build the entire storefront yet.

Build:

1. Global design tokens
2. Typography system
3. Color system
4. Spacing system
5. Buttons
6. Inputs
7. Product cards
8. Editorial cards
9. Badges
10. Dividers
11. Header
12. Mobile navigation
13. Footer
14. Drawer/sheet component
15. Loading state
16. Empty state
17. Error state
18. Success state

Create an internal /design-system page demonstrating all of the above.

Also create the global responsive page shell.

RESPONSIVE

Design mobile first.

Desktop should feel like an expansion of the mobile experience, not a separate design.

Touch targets should be comfortable.
Typography should remain readable.
Do not create horizontal scrolling.

TECHNICAL CONSTRAINTS

Use the existing project/frontend stack.

Use reusable components.

Centralize the design tokens.

Do not create:
- custom checkout
- custom payment processing
- custom authentication
- backend APIs
- databases
- unnecessary dependencies

Do not implement real Shopify integration yet.

The objective of this generation is ONLY:

DISCOVER AND IMPLEMENT THE VISUAL IDENTITY + GLOBAL UI FOUNDATION.

Make the design visually distinctive and memorable while remaining commercially usable.
```

### STOP HERE

This is the most important generation.

Before doing anything else, answer these questions yourself:

- Does it look different from ordinary e-commerce?
- Does it feel Muslim without looking stereotypically "Islamic"?
- Does it feel premium?
- Does it feel warm rather than sterile?
- Would the same visual language work for a prayer mat, children's product and modest clothing?
- Does mobile feel intentional?
- Does it look like a real brand rather than an AI-generated website?

If yes, **freeze the direction**.

Do not send a prompt saying "make it more premium."

Use targeted Visual Edits for small corrections.

---

# PROMPT 2 — FREEZE THE DESIGN SYSTEM + HOMEPAGE

```text
The visual identity from the previous generation is approved.

Do NOT redesign the theme.

Treat the current design system as canonical.

Build the homepage using the existing components and design language.

The homepage must communicate the brand in approximately five seconds.

The user should immediately understand:

1. this is a Muslim family lifestyle brand
2. it is curated rather than a marketplace
3. the products are connected to meaningful family life
4. there is editorial content beyond shopping

HOMEPAGE STRUCTURE

1. Header

2. Editorial hero
- strong lifestyle photography
- concise brand proposition
- primary shopping CTA
- secondary editorial CTA

3. Brand philosophy
Explain the idea of intentional Muslim family living.

4. Signature curated products/bundles
Show approximately 3 hero commercial groupings.

Each should communicate:
- image
- name
- concise purpose
- price
- CTA

5. Editorial feature
Feature one strong "Muslim home / family life" story.

6. Category discovery
Introduce:
- Home
- Children
- Modest Essentials
- Journal

7. Trust/craft section
Communicate quality, materials, sourcing and care.

8. Newsletter/invitation section

9. Footer

UX PRINCIPLES

Editorial first.
Commerce second.

The visitor should be able to shop immediately without feeling pressured.

No:
- excessive promotional badges
- countdowns
- fake urgency
- visual clutter
- giant text blocks

Use realistic mock content.

Do not implement backend integrations.
Do not modify the established global visual system.
```

---

# PROMPT 3 — COLLECTION / PRODUCT DISCOVERY

```text
Using the existing approved design system, build the main shopping/collection experience.

Do NOT redesign the theme.

OBJECTIVE

Make shopping calm but efficient.

The visitor should be able to:
- understand the collection
- scan products quickly
- filter when necessary
- compare products
- reach product details easily

STRUCTURE

1. Collection introduction
2. Product count
3. Sorting
4. Filter controls
5. Responsive product grid
6. Mobile filter drawer
7. Empty state
8. Pagination or load-more

PRODUCT CARD

Use the existing product-card component.

Show:
- image
- product name
- short descriptor
- price
- optional subtle availability indicator

Avoid:
- giant sale badges
- excessive metadata
- crowded cards
- marketplace-like density

Important:

Preserve visual hierarchy so the product photography remains dominant.

Do not add backend functionality.
Use mock data.
Reuse existing design-system components.
```

---

# PROMPT 4 — PRODUCT DETAIL PAGE

```text
Using the existing approved design system, build the product detail page.

Do NOT redesign the global theme.

OBJECTIVE

Create a product page that combines:
- emotional product storytelling
- transparent information
- effortless purchasing

DESKTOP

Two-column:
- image/gallery
- purchase information

MOBILE

Prioritize:
1. product imagery
2. title/value proposition
3. price
4. variants
5. Add to Cart
6. delivery/returns reassurance
7. product story

INCLUDE

- image gallery
- title
- concise product promise
- price
- optional compare-at price
- variant selection
- quantity
- primary CTA
- delivery information
- return/exchange information
- materials
- dimensions
- care instructions
- craft/story
- customer reviews
- one restrained complementary product

BUNDLE SECTION

Show one optional complementary bundle.

Do not make upselling aggressive.

Do not use:
- fake urgency
- countdown timers
- manipulative scarcity
- unnecessary popups

The purchase action must remain visually obvious.

Use mock product data.

Do not implement checkout or payment processing.
```

---

# PROMPT 5 — CART DRAWER

```text
Using the existing design system, build the cart drawer.

Do not redesign the website.

OBJECTIVE

The cart should be:
- fast
- calm
- trustworthy
- mobile-friendly
- commercially effective

INCLUDE

- product thumbnail
- product name
- variant
- quantity controls
- remove
- subtotal
- shipping message
- optional bundle progress
- one or two relevant complementary products
- checkout CTA

The checkout CTA should clearly represent the transition to native commerce checkout.

Do not build a custom checkout.

Do not add:
- fake urgency
- excessive upselling
- countdown timers
- aggressive promotional copy

Quantity changes should update the UI immediately in mock state.

Use existing design components.
```

---

# PROMPT 6 — JOURNAL / EDITORIAL EXPERIENCE

```text
Using the approved design system, build the Journal experience.

Do not change global visual styles.

The Journal is the intellectual and editorial layer of the brand.

Create:

1. Journal landing page
2. Featured story
3. Article cards
4. Category navigation
5. Article detail page

EDITORIAL TERRITORY

- Muslim home
- intentional family life
- parenting
- family routines
- Islamic habits
- home environment
- Ramadan
- meaningful everyday rituals

DESIGN

Make this feel closer to a premium independent magazine than an ecommerce blog.

Prioritize:
- typography
- photography
- reading comfort
- strong editorial hierarchy
- generous but controlled whitespace

COMMERCE

Products can appear contextually inside articles.

However:

The article must remain useful even if the reader never buys anything.

Include:
- related story
- related guide
- one relevant product

Use mock content.

Do not add CMS/backend integration yet.
```

---

# PROMPT 7 — ABOUT / TRUST / CUSTOMER CARE

```text
Using the existing design system, build the following pages:

1. About / Philosophy
2. Craft / Materials
3. FAQ
4. Shipping & Returns
5. Customer Care / Contact

Do not change the global visual identity.

The purpose is trust.

The visitor should understand:

- why this brand exists
- what it believes in
- how products are selected
- how quality is approached
- how customers are supported
- what happens after an order

Use editorial storytelling rather than corporate brochure design.

Reuse existing components.

Do not add backend functionality.
```

---

# PROMPT 8 — FINAL UX / MOBILE / ACCESSIBILITY AUDIT

```text
Perform a focused UX and frontend quality audit of the current application.

DO NOT redesign the brand.

DO NOT introduce a new theme.

DO NOT add new features.

Audit:

- homepage
- collection
- product page
- cart drawer
- journal
- about
- mobile navigation
- footer

Check:

1. Mobile responsiveness
2. Touch target sizes
3. Typography readability
4. Heading hierarchy
5. Contrast
6. Keyboard navigation
7. Focus states
8. Button clarity
9. Form usability
10. Product discovery
11. Purchase CTA visibility
12. Page loading/layout stability
13. Excessive animation
14. Duplicate components/styles
15. Visual consistency

Make only concrete improvements.

For any issue that can be corrected with a small visual change, make the smallest possible change.

Do not rewrite correct components.

Do not redesign successful pages.
```

---

# 9. VISUAL EDIT PROMPTS

Use these instead of full AI generations whenever possible.

## Example — spacing

```text
Use a Visual Edit only.

Reduce the vertical gap between the hero subtitle and primary CTA by approximately 20%.

Do not modify typography, colors, layout structure, or any other component.
```

## Example — product cards

```text
Use a Visual Edit only.

Reduce the visual weight of the product-card metadata so the product image and product name become the dominant elements.

Do not change card dimensions or page layout.
```

## Example — mobile

```text
Use a Visual Edit only.

Increase the mobile Add to Cart button height to create a more comfortable touch target.

Do not modify desktop styling or any other component.
```

---

# 10. WHEN TO USE THE OLD GEMINI DESIGN SPECIFICATION

Do not provide the old detailed theme specification initially.

Only introduce it when Lovable's own visual direction fails.

Use it as a correction/reference if the output becomes:

- too generic
- too playful
- too SaaS-like
- too luxury-fashion-oriented
- too ornamental
- insufficiently Islamic
- insufficiently premium
- visually inconsistent

At that point, selectively introduce only the needed constraints.

Do NOT replace the entire design with a 100-line style specification.

---

# 11. FINAL DESIGN PHILOSOPHY

The hierarchy should be:

STRATEGY
→ defines WHAT the brand should communicate

LOVABLE
→ determines HOW the interface should visually communicate it

FOUNDER
→ approves/rejects the resulting direction

DESIGN SYSTEM
→ freezes the accepted visual language

VISUAL EDITS
→ handle small refinements

FOCUSED PROMPTS
→ handle structural changes

This keeps Lovable creative without allowing it to redefine the business.

---

# 12. CRITICAL RULE

Never tell Lovable:

"Make the entire website more premium."

Instead tell it:

"Reduce the visual weight of the secondary CTA in the hero while preserving the current design system."

The second prompt is cheaper, safer and more deterministic.

Build depth before breadth.
Polish five important surfaces before building fourteen.

```

### My recommended first move

Use **Prompt 1 only** and let Lovable make the visual identity decision.

That is the one part I would deliberately *not* outsource to the Gemini research specification. Your existing research should define the strategic constraints, while Lovable should have creative latitude in translating them into an interface.

Once that first theme is genuinely good, **freeze it and make every subsequent Lovable prompt say “do not redesign the visual identity.”**

This approach is also aligned with Lovable's own recommendation to work incrementally and make prompts specific rather than asking the system to handle many unrelated tasks at once.

One more important change from the existing document: **don't build the 14 templates immediately.** The document's 14 pages are a valid eventual target, but with limited credits I would first perfect only **Home → Collection → PDP → Cart → Journal**.

That gives you a much better chance of discovering a genuinely distinctive visual language before spending credits on secondary pages.
```
